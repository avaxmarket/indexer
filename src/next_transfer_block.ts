global.envmap = 'next'

import { scan_json_type } from "./types"
import { hex_to_string } from "./utils/hex"
import { ASC20_V1_TRANSFER_MAX, AVAL_TICK, AVAX_PROTOCOL, AVAX_PROTOCOL_PREFIX_HEX, DEC, PRE_BLOCK_NUMBER, ZERO_ADDRESS } from "./constant"
import { continuous_block } from "./utils/continuous_block"
import { BigNumber } from "bignumber.js"
import { get_indexer_last_block, set_indexer_last_block } from "./utils/io"
import { pool } from "./db/pool"
import { get_avax_insc_blocks_info } from "./db/select/block"
import { envmap } from "./utils/envmap"
import { get_avax_insc_utxo_info } from "./db/select/utxo"

const main = async (
    start_block_number: number, end_block_number,
) => {
    while (true) {
        const conn = await pool.getConnection()
        const db_rustlt = await get_avax_insc_blocks_info(start_block_number, end_block_number, pool)

        const block_number_arr = db_rustlt.map((row) => {
            const block_data = row.block_data.result
            return parseInt(block_data.number, 16)
        })
        const { last_index: block_last_index, last_number: block_last_number } = continuous_block(block_number_arr)

        const able_db_result = db_rustlt.slice(0, block_last_index + 1)

        const able_db_result_block_number_arr =  able_db_result.map((row) => row.block_data.result.number).map((e) => parseInt(e, 16))
        if(able_db_result_block_number_arr?.[0] !== start_block_number){
            await new Promise((ok) => setTimeout(ok, 6e3))
            continue
        }
        try {
            await conn.beginTransaction()
            for await (const row of able_db_result) {
                const prefix_hex_len = AVAX_PROTOCOL_PREFIX_HEX.length
                const block_data = row.block_data.result
                const transaction_sort_list = block_data.transactions.sort((a, b) => parseInt(a.transactionIndex, 16) - parseInt(b.transactionIndex, 16))

                const current_block_number = parseInt(block_data.number, 16)
                for await (const transaction of transaction_sort_list) {
                    const from = transaction.from.toLocaleLowerCase()
                    const to = transaction.to ? transaction.to.toLocaleLowerCase() : ''
                    if (
                        transaction.input.substring(0, prefix_hex_len) === AVAX_PROTOCOL_PREFIX_HEX &&
                        to
                    ) {
                        const input_string = hex_to_string(transaction.input.substring(prefix_hex_len, transaction.input.length))
                        let inscription: scan_json_type | undefined
                        try {
                            inscription = JSON.parse(input_string)
                        } catch (error) {
                        }
                        if (inscription?.p === AVAX_PROTOCOL) {
                            if (
                                inscription.op === 'transfer' &&
                                inscription.tick === AVAL_TICK &&
                                inscription?.vin &&
                                inscription?.vout &&
                                inscription?.vin?.length > 0 && 
                                inscription?.vout?.length > 0
                                // && transaction.to === ZERO_ADDRESS
                            ) {
                                let isTransfer = true
                                let input_value = new BigNumber(0)
                                let output_value = new BigNumber(0)
                                let spent_utxo_flag_list: string[] = []
                                for await (const input of inscription.vin) {
                                    if(spent_utxo_flag_list.includes(utxo_id)){
                                        isTransfer = false
                                        continue
                                    }
                                    const utxo = await get_avax_insc_utxo_info(input.txid, parseInt(input.vout))
                                    if (utxo?.owner?.toLocaleLowerCase() !== from) {
                                        isTransfer = false
                                        continue
                                    }
                                    input_value = input_value.plus(
                                        new BigNumber(utxo.value).multipliedBy(DEC)
                                    )
                                }
                                for (const output of inscription.vout) {
                                    if(BigNumber(output.amt).isLessThan(0)){
                                        isTransfer = false
                                    }
                                    output_value = output_value.plus(
                                        new BigNumber(output.amt).multipliedBy(DEC)
                                    )
                                }
                                if (input_value.isLessThan(output_value)) {
                                    isTransfer = false
                                }
                                const excess_funds = input_value.minus(output_value).dividedBy(DEC).toNumber()
                                if (
                                    inscription.vout.length <= ASC20_V1_TRANSFER_MAX &&
                                    isTransfer &&
                                    input_value.isGreaterThan(0)
                                ) {
                                    let run_vout = inscription.vout
                                    if (excess_funds > 0) {
                                        run_vout = [...run_vout, {
                                            amt: excess_funds.toString(),
                                            scriptPubKey: {
                                                addr: transaction.from.toLocaleLowerCase()
                                            }
                                        }]
                                    }
                                    let new_vout_index = 0
                                    for await (const input of inscription.vin) {
                                        await pool.execute(`UPDATE ${envmap.db.table.utxo} SET confirmed = ? WHERE txid = ? AND \`index\` = ?`, [1/* true */, input.txid, input.vout])
                                        console.log(`UPDATE ${envmap.db.table.utxo}`, [1/* true */, input.txid, input.vout].join(','))
                                    }
                                    for await (const output of run_vout) {
                                        await pool.execute(`INSERT IGNORE INTO ${envmap.db.table.utxo} (
                                                        txid, \`value\`, \`owner\`,
                                                        \`index\`, confirmed, tick,
                                                        block_number
                                                    ) VALUES (
                                                        ?, ?, ?,
                                                        ?, ?, ?,
                                                        ?
                                                    )`, [
                                            transaction.hash, output.amt, output.scriptPubKey.addr.toLocaleLowerCase(),
                                            new_vout_index, 0/* false */, AVAL_TICK,
                                            current_block_number
                                        ])
                                        console.log(`INSERT ${envmap.db.table.utxo}`, [output.amt, output.scriptPubKey.addr.toLocaleLowerCase()].join(','))
                                        new_vout_index++
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
            // commit success
            await conn.commit()
            conn.release()
            pool.releaseConnection(conn)
            if(block_last_number !== 0){
                await set_indexer_last_block(block_last_number + 1)
            }
            if (able_db_result.length === 0) {
                await new Promise((ok) => setTimeout(ok, 6e3))
                continue
            } else {
                let block_number = await get_indexer_last_block()
                start_block_number = block_number
                end_block_number = block_number + PRE_BLOCK_NUMBER
                continue
            }
        } catch (error) {
            // console.log('able_db_result::', able_db_result)
            console.log('db_rustlt::', error, start_block_number)
        }
        await new Promise((ok) => setTimeout(ok, 6e3))
    }
}
const next_transfer_main = async () => {
    let block_number = await get_indexer_last_block()
    await main(block_number, block_number + PRE_BLOCK_NUMBER)
}
next_transfer_main()
