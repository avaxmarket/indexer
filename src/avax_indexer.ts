import * as dotenv from "dotenv"
import * as mysql from "mysql2"
import { db_interface_block_json, scan_json_type } from "./types"
import { hex_to_string } from "./utils/hex"
import { ASC20_V1_TRANSFER_MAX, AVAL_INPUT_HEX, AVAL_TICK } from "./constant"

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: 'aval',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
})

let block_number = 38317488

const nextTick = (block_number: number) => {
    pool.getConnection((err, conn) => {
        pool.query({ 
            sql: `select block_data from block_json WHERE block_number = ?`,
            rowsAsArray: true,
        }, 
        [block_number],
        (err, rows: any) => {
            let is_begin = false
            conn.beginTransaction(async (begin_err) => {
                if(!begin_err){
                    console.log('begin error::', begin_err)
                    return
                }
                is_begin = true
                rows.map(async (e: any) => {
                    const prefix_hex = '0x646174613a2c'
                    const prefix_hex_len = prefix_hex.length
                    const block_data = e[0] as db_interface_block_json
                    const transaction_sort_list = block_data.result.sort((a, b) => parseInt(a.transactionIndex) - parseInt(b.transactionIndex))
                
                    for await (const transaction of transaction_sort_list) {
                        if(transaction.input.substring(0, prefix_hex_len) === prefix_hex){
                            // TODO already hesh
                            const already_hash = false
                            if(already_hash){
                                continue
                            }
                            const input_string = hex_to_string(transaction.input.substring(prefix_hex_len, transaction.input.length))
                            const inscription: scan_json_type = JSON.parse(input_string)
                            if(inscription.p === 'asc-20'){
                                if(inscription.op === 'mint'){
                                    if(
                                        // inscription.amt === "100000000" &&
                                        // inscription.tick === "aval" &&
                                        block_number >= 37942008 &&
                                        transaction.input === AVAL_INPUT_HEX
                                    ) {
                                        pool.execute(`INERT INTO utxo (
                                            txid, value, owner,
                                            index, confirmed, tick
                                        ) VALUES (
                                            ?, ?, ?,
                                            ?, ?, ?
                                        )`, [
                                            transaction.hash, inscription.amt, transaction.to.toLocaleLowerCase(),
                                            0, 0/* false */, AVAL_TICK
                                        ])
                                    }
                                }
                                if(
                                    inscription.op === 'transfer' && 
                                    inscription.tick === AVAL_TICK
                                ){
                                    pool.execute(`INERT INTO transfer_history (
                                        from, to, vins,
                                        vouts, hash, tick
                                    ) VALUES (
                                        ?, ?, ?,
                                        ?, ?, ?
                                    )`, [
                                        transaction.from, transaction.to, JSON.stringify(inscription.vin), 
                                        JSON.stringify(inscription.vout), transaction.hash, inscription.tick,
                                    ])
                                    // TODO check send value ...
                                    // TODO check vout addr ...
                                    if(inscription.vout.length <= ASC20_V1_TRANSFER_MAX){
                                        let new_vout_index = 0
                                        for await (const output of inscription.vout) {
                                            pool.execute(`INERT INTO user_transfer (
                                                from, to, value,
                                                time, hash, block_number,
                                                tick
                                            ) VALUES (
                                                ?, ?, ?,
                                                ?, ?, ?,
                                                ?
                                            )`, [
                                                transaction.from, output.scriptPubKey.addr, output.amt,
                                                block_data.timestamp, transaction.hash, block_number,
                                            ])
                                            pool.execute(`INERT INTO utxo (
                                                txid, value, owner,
                                                index, confirmed, tick
                                            ) VALUES (
                                                ?, ?, ?,
                                                ?, ?, ?
                                            )`, [
                                                transaction.hash, output.amt, output.scriptPubKey.addr,
                                                new_vout_index, 1/* true */, AVAL_TICK
                                            ])
                                            new_vout_index++
                                        }

                                        for await (const input of inscription.vin) {
                                            pool.execute(`UPDATE utxos SET confirmed = ? WHERE txid = ? AND index = ?`, [1/* true */, input.txid, input.txid])
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
            })
            if(is_begin){
                conn.commit()
                // todo set new block number
                nextTick(block_number + 1)
            }else{
                setTimeout(() => {
                    nextTick(block_number)
                }, 2e3)
            }
        })
    })
}

// TODO handle pool error
// pool.end()

// start
nextTick(block_number)