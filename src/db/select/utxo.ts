import { AVAL_TICK } from "../../constant"
import { db_utxo_info } from "../../types"
import { pool } from "../pool"

export const get_avax_insc_utxo_info = async (txid: string, index: number): Promise<db_utxo_info> => {
    return (await pool.query(
        `SELECT * FROM utxo WHERE txid = ? AND  \`index\` = ? AND confirmed = ? AND limit 1`,
        [txid, index, 1]
    )[0]) as db_utxo_info
}