import { AVAL_TICK } from "../../constant"
import { db_tick_info } from "../../types"
import { pool } from "../pool"

export const get_avax_insc_tick_info = async (tick = AVAL_TICK): Promise<db_tick_info> => {
    return (await pool.query(`SELECT * FROM avax_tick WHERE tick = ?`, [tick]))[0][0] as unknown as db_tick_info
}