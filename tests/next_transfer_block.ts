global.envmap = 'next'

import { scan_json_type } from "../src/types"
import { hex_to_string } from "../src/utils/hex"
import { ASC20_V1_TRANSFER_MAX, AVAL_INPUT_HEX, AVAL_LIM, AVAL_SUPPLY, AVAL_TICK, AVAX_PROTOCOL, AVAX_PROTOCOL_PREFIX_HEX, DEC, PRE_BLOCK_NUMBER, ZERO_ADDRESS } from "../src/constant"
import { continuous_block } from "../src/utils/continuous_block"
import { BigNumber } from "bignumber.js"
import { envmap } from "../src/utils/envmap"

/**
data:,{"p":"asc-20","op":"transfer","tick":"aval","vin":[{"txid":"0x678a","vout":"0"}],"vout":[{"amt":"2","scriptPubKey":{"addr":"0xbob"}}]}
 */
const utxo =  {
    txid: '0x678a',
    value: "1000",
    owner: "0xalice",
    index: '0',
    confirmed: 0,
    tick: AVAL_TICK,
    vin_hash: ""
}


const main = async (
) => {
    const db_rustlt = [
        {
            block_data: {
                result: {
                    number: '0xa',
                    transactions: [
                        {
                            transactionIndex: '0x1',
                            from: '0xalice',
                            to: ZERO_ADDRESS,
                            input: '0x0a646174613a2c7b2270223a226173632d3230222c226f70223a227472616e73666572222c227469636b223a226176616c222c2276696e223a5b7b2274786964223a223078303030222c22766f7574223a2230227d5d2c22766f7574223a5b7b22616d74223a2232222c227363726970745075624b6579223a7b2261646472223a223078303030227d7d5d7d',
                            hash: '0xff0123'
                        }
                    ]
                },
            }
        },
        {
            block_data: {
                result: {
                    number: '0xb',
                },
            }
        },
    ]

    const block_number_arr = db_rustlt.map((row) => {
        const block_data = row.block_data.result
        return parseInt(block_data.number, 16)
    })
    const { last_index: block_last_index, last_number: block_last_number } = continuous_block(block_number_arr)

    const able_db_result = db_rustlt.slice(0, block_last_index + 1)

    try {
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
                            transaction.to === ZERO_ADDRESS
                        ) {
                            let isTransfer = true
                            let inputValue = new BigNumber(0)
                            let outputValue = new BigNumber(0)
                            for await (const input of inscription.vin) {
                                
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
                                for await (const input of inscription.vin) {
                                    execute(`UPDATE ${envmap.db.table.utxo} SET confirmed = ? WHERE txid = ? AND index = ?`, [1/* true */, input.txid, input.vout])
                                }
                                for await (const output of run_vout) {
                                    execute(`INSERT IGNORE INTO ${envmap.db.table.utxo} (
                                                        txid, value, owner,
                                                        \`index\`, confirmed, tick,
                                                        block_number
                                                    ) VALUES (
                                                        ?, ?, ?,
                                                        ?, ?, ?,
                                                        ?
                                                    )`, [
                                        transaction.hash, output.amt, output.scriptPubKey.addr,
                                        new_vout_index, 0/* false */, AVAL_TICK,
                                        current_block_number
                                    ])
                                    new_vout_index++
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log('commit')
    } catch (error) {
    }
    await new Promise((ok) => setTimeout(ok, 3e3))
}

function execute(sql: string, params: any[]) {
    console.log(sql, params.join(','))
}

main()