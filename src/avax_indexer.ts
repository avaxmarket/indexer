import { db_interface_block_json, scan_json_type } from "./types"
import { hex_to_string } from "./utils/hex"
import { ASC20_V1_TRANSFER_MAX, AVAL_INPUT_HEX, AVAL_LIM, AVAL_SUPPLY, AVAL_TICK, AVAX_PROTOCOL, AVAX_PROTOCOL_PREFIX_HEX, DEC, PRE_BLOCK_NUMBER } from "./constant"
import { continuous_block } from "./utils/continuous_block"
import { BigNumber } from "bignumber.js"
import { get_indexer_last_block, set_indexer_last_block } from "./utils/io"
import { pool } from "./db/pool"
import { get_avax_insc_tick_info } from "./db/select/tick"
import { get_avax_insc_utxo_info } from "./db/select/utxo"
import { get_avax_insc_blocks_info } from "./db/select/block"

const nextBlock = async (start_block_number: number, end_block_number: number) => {
    const conn = await pool.getConnection()
    conn.release()
    // TODO catch
    const db_rustlt = await get_avax_insc_blocks_info(start_block_number, end_block_number)

    const block_number_arr = db_rustlt.map((row) => {
        // const block_data = rows[0] as db_interface_block_json
        const block_data = row.block_data.result
        return parseInt(block_data.number, 16)
    })
    // console.log('block_number_arr::', block_number_arr)
    const { last_index: block_last_index, last_number: block_last_number } = continuous_block(block_number_arr)

    const able_db_result = db_rustlt.slice(0, block_last_index + 1)

    // TODO catch
    const { amt } = await get_avax_insc_tick_info()
    let total_mint = BigNumber(amt)
    console.log("total_mint::", amt)
    try {
        for await (const row of able_db_result) {
            const prefix_hex_len = AVAX_PROTOCOL_PREFIX_HEX.length
            const block_data = row.block_data.result
            const transaction_sort_list = block_data.transactions.sort((a, b) => parseInt(a.transactionIndex, 16) - parseInt(b.transactionIndex, 16))
    
            const current_block_number = parseInt(block_data.number, 16)
    
            for await (const transaction of transaction_sort_list) {
                const from = transaction.from.toLocaleLowerCase()
                const to = transaction.to ? transaction.to.toLocaleLowerCase() : ''
    
                await conn.beginTransaction()
    
                if (
                    transaction.input.substring(0, prefix_hex_len) === AVAX_PROTOCOL_PREFIX_HEX &&
                    to
                ) {
                    // TODO already hesh
                    const already_hash = false
                    if (already_hash) {
                        continue
                    }
                    const input_string = hex_to_string(transaction.input.substring(prefix_hex_len, transaction.input.length))
                    // console.log('input_string::', input_string)
                    let inscription: scan_json_type | undefined
                    try {
                        inscription = JSON.parse(input_string)
                    } catch (error) {
                    }
                    if (inscription?.p === AVAX_PROTOCOL) {
                        if (inscription.op === 'mint') {
                            if (
                                total_mint.isLessThan(AVAL_SUPPLY) &&
                                transaction.input === AVAL_INPUT_HEX
                            ) {
                                total_mint = total_mint.plus(AVAL_LIM)
                                await pool.execute(`INSERT INTO utxo (
                                                txid, value, owner,
                                                \`index\`, confirmed, tick
                                            ) VALUES (
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
                            let isTransfer = true
                            let inputValue = new BigNumber(0)
                            let outputValue = new BigNumber(0)
                            for await (const input of inscription.vin) {
                                const utxo = await get_avax_insc_utxo_info(input.txid, parseInt(input.vout))
                                if (utxo.owner.toLocaleLowerCase() !== from) {
                                    isTransfer = false
                                    continue
                                }
                                inputValue.plus(
                                    new BigNumber(utxo.value).multipliedBy(DEC)
                                )
                            }
                            for (const output of inscription.vout) {
                                outputValue.plus(
                                    new BigNumber(output.amt).multipliedBy(DEC)
                                )
                            }
                            if (inputValue.isLessThan(outputValue)) {
                                isTransfer = false
                            }
                            const excess_funds = inputValue.minus(outputValue).dividedBy(DEC).toNumber()
    
                            pool.execute(`INERT INTO user_transfer (
                                            \`from\`, \`to\`, vins,
                                            vouts, hash, tick,
                                            success, block_number, time
                                        ) VALUES (
                                            ?, ?, ?,
                                            ?, ?, ?,
                                            ?, ?, ?
                                        )`, [
                                from, transaction.to, JSON.stringify(inscription.vin),
                                JSON.stringify(inscription.vout), transaction.hash, inscription.tick,
                                isTransfer ? 1 : 0, current_block_number, block_data.timestamp
                            ])
                            if (
                                inscription.vout.length <= ASC20_V1_TRANSFER_MAX &&
                                isTransfer
                            ) {
                                let run_vout = inscription.vout
                                if (excess_funds > 0) {
                                    run_vout = [...run_vout, {
                                        amt: excess_funds.toString(),
                                        scriptPubKey: {
                                            addr: transaction.from
                                        }
                                    }]
                                }
                                let new_vout_index = 0
                                for await (const output of run_vout) {
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
                                        inscription.tick
                                    ])
                                    pool.execute(`INSERT INTO utxo (
                                                    txid, value, owner,
                                                    \`index\`, confirmed, tick
                                                ) VALUES (
                                                    ?, ?, ?,
                                                    ?, ?, ?
                                                )`, [
                                        transaction.hash, output.amt, output.scriptPubKey.addr,
                                        new_vout_index, 0/* false */, AVAL_TICK
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
                // console.log("::total_mint::", total_mint)
                if (total_mint.isGreaterThan(0)) {
                    pool.execute(`UPDATE avax_tick SET amt = ? WHERE tick = ?`, [total_mint.toString(), AVAL_TICK])
                }
                // commit success
                await conn.commit()
                // loop:: set new block number
                // block_last_number live
            }
            await set_indexer_last_block(block_last_number + 1)
        }
        if (able_db_result.length === 0) {
            console.log('able_db_result.length === 0')
            setTimeout(() => {
                nextBlock(start_block_number, end_block_number)
            }, 300)
        } else {
            await main()
        }
    } catch (error) {
        console.log('db_rustlt::', error, start_block_number)
        console.log('able_db_result::', able_db_result)
    }
}

// start
const main = async () => {
    let block_number = await get_indexer_last_block()
    console.log("start block number::", block_number)
    await nextBlock(block_number, block_number + PRE_BLOCK_NUMBER)
    // let block_number = 38094867
    // await nextBlock(block_number, block_number)
}
main()