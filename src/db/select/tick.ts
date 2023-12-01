import { AVAL_TICK } from "../../constant"
import { db_tick_info } from "../../types"
import { pool } from "../pool"

export const get_avax_insc_tick_info = (tick = AVAL_TICK): Promise<db_tick_info> => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM avax_tick WHERE tick = ?`, [tick], (err, result) => {
            if(err){
                reject(err)
                return
            }
            const tick_info = result[0] as db_tick_info
            resolve(tick_info)
        })
    })
}