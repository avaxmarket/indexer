import { AVAL_TICK } from "../../constant"
import { db_utxo_info } from "../../types"
import { pool } from "../pool"

export const get_avax_insc_utxo_info = (txid: string, index: number): Promise<db_utxo_info> => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM utxo WHERE txid = ? AND  \`index\` = ?`, [txid, index], (err, result) => {
            if(err){
                reject(err)
                return
            }
            const utxo_info = result[0] as db_utxo_info
            resolve(utxo_info)
        })
    })
}