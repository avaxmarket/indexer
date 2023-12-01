import { db_interface_block_json, scan_json_type } from "./types"
import { hex_to_string } from "./utils/hex"
import { ASC20_V1_TRANSFER_MAX, AVAL_INPUT_HEX, AVAL_LIM, AVAL_SUPPLY, AVAL_TICK, AVAX_PROTOCOL, AVAX_PROTOCOL_PREFIX_HEX, PRE_BLOCK_NUMBER } from "./constant"
import { continuous_block } from "./utils/continuous_block"
import { BigNumber } from "bignumber.js"
import { get_indexer_last_block, set_indexer_last_block } from "./utils/io"
import { pool } from "./db/pool"
import { get_avax_insc_tick_info } from "./db/select/tick"

const nextBlock = (start_block_number: number, end_block_number: number) => {
    pool.getConnection((err, conn) => {
        pool.query({
            sql: `select block_data from block_json WHERE block_number >= ? AND block_number <= ?`,
            rowsAsArray: true,
        },
            [start_block_number, end_block_number],
            async (err, db_rustlt: any) => {
                if (err) {
                    console.log('err--->', err)
                    pool.end()
                    // TODO next
                    return
                }
                const block_number_arr = db_rustlt.result.map((rows: any) => {
                    const block_data = rows[0] as db_interface_block_json
                    return parseInt(block_data.number, 16)
                })
                console.log('block_number_arr::', block_number_arr)
                const { last_index: block_last_index, last_number: block_last_number } = continuous_block(block_number_arr)

                const able_db_rustlt = db_rustlt.slice(0, block_last_index + 1)


                // TODO catch
                const { amt } = await get_avax_insc_tick_info()
                let total_mint = BigNumber(amt)
                able_db_rustlt.map(async (rows: any) => {
                    const prefix_hex_len = AVAX_PROTOCOL_PREFIX_HEX.length
                    const block_data = rows[0] as db_interface_block_json
                    const transaction_sort_list = block_data.result.sort((a, b) => parseInt(a.transactionIndex, 16) - parseInt(b.transactionIndex, 16))

                    const current_block_number = parseInt(block_data.number, 16)

                    for await (const transaction of transaction_sort_list) {
                        const from = transaction.from.toLocaleLowerCase()
                        const to = transaction.to.toLocaleLowerCase()

                        const isBegin = await new Promise((ok) => {
                            conn.beginTransaction(async (begin_err) => {
                                if (begin_err) {
                                    console.log('begin error::', begin_err)
                                    ok(false)
                                }
                                ok(true)
                            })
                        })

                        if (!isBegin) {
                            pool.end()
                            return
                        }

                        if (transaction.input.substring(0, prefix_hex_len) === AVAX_PROTOCOL_PREFIX_HEX) {
                            // TODO already hesh
                            const already_hash = false
                            if (already_hash) {
                                continue
                            }
                            const input_string = hex_to_string(transaction.input.substring(prefix_hex_len, transaction.input.length))
                            const inscription: scan_json_type = JSON.parse(input_string)
                            if (inscription.p === AVAX_PROTOCOL) {
                                if (inscription.op === 'mint') {
                                    // TODO other tick
                                    if (
                                        total_mint.isLessThanOrEqualTo(AVAL_SUPPLY) &&
                                        transaction.input === AVAL_INPUT_HEX
                                    ) {
                                        total_mint.plus(AVAL_LIM)
                                        pool.execute(`INERT INTO utxo (
                                            txid, value, owner,
                                            \`index\`, confirmed, tick
                                        ) VALUES (
                                            ?, ?,
                                            ?, ?, ?,
                                            ?, ?, ?
                                        )`, [
                                            transaction.hash, inscription.amt, to,
                                            0, 0/* false */, AVAL_TICK
                                        ])
                                    }
                                }
                                if (
                                    inscription.op === 'transfer' &&
                                    inscription.tick === AVAL_TICK
                                ) {
                                    let isTransfer = false

                                    // TODO check send value ...
                                    // TODO check vout addr ...
                                    
                                    pool.execute(`INERT INTO transfer_history (
                                        \`from\`, \`to\`, vins,
                                        vouts, hash, tick
                                    ) VALUES (
                                        ?, ?, ?,
                                        ?, ?, ?
                                    )`, [
                                        from, transaction.to, JSON.stringify(inscription.vin),
                                        JSON.stringify(inscription.vout), transaction.hash, inscription.tick,
                                    ])
                                    if (
                                        inscription.vout.length <= ASC20_V1_TRANSFER_MAX &&
                                        isTransfer
                                    ) {
                                        let new_vout_index = 0
                                        // TODO Automatically return excess funds
                                        for await (const output of inscription.vout) {
                                            pool.execute(`INERT INTO user_transfer (
                                                \`from\`, \`to\`, value,
                                                time, hash, block_number,
                                                tick
                                            ) VALUES (
                                                ?, ?, ?,
                                                ?, ?, ?,
                                                ?
                                            )`, [
                                                from, output.scriptPubKey.addr, output.amt,
                                                block_data.timestamp, transaction.hash, current_block_number,
                                            ])
                                            pool.execute(`INERT INTO utxo (
                                                txid, value, owner,
                                                \`index\`, confirmed, tick
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
                        // commit success
                        const isOk = await new Promise((ok) => {
                            conn.commit((err) => {
                                if (err) {
                                    ok(false)
                                }
                                ok(true)
                            })
                        })
                        // loop:: set new block number
                        nextBlock(block_last_number + (isOk ? 1 : 0), PRE_BLOCK_NUMBER)
                        // block_last_number live
                        set_indexer_last_block(block_last_number)

                    }
                })
            })

    })
}

// TODO handle pool error
// pool.end()

// start
const main = async () => {
    let block_number = await get_indexer_last_block()
    nextBlock(block_number, block_number + PRE_BLOCK_NUMBER)
}
main()