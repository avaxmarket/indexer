import { AVAL_LIM, AVAL_SUPPLY, AVAL_TICK } from "../src/constant";
import { pool } from "../src/db/pool";
import { get_avax_insc_tick_info } from "../src/db/select/tick";
import { db_tick_info } from "../src/types";


const run = async () => {
    const { max, tick } = await get_avax_insc_tick_info()
    const tick_info2 = await get_avax_insc_tick_info(AVAL_TICK)
    console.log("select_db.test 1:1:", max === AVAL_SUPPLY)
    console.log("select_db.test 1:2:", tick === AVAL_TICK)
    console.log("select_db.test 1:3:", tick_info2.max === AVAL_SUPPLY)
    console.log("select_db.test 1:4:", tick_info2.tick === AVAL_TICK)
    console.log("select_db.test 1:5:", tick_info2.lim === Number(AVAL_LIM))
    pool.query(`SELECT amt, max, tick FROM avax_tick WHERE tick = ?`, [AVAL_TICK], (err, result) => {
        if(err){
            return console.log('select_db.test ERROR!!!!!!')
        }
        const tick_info = result[0] as db_tick_info
        console.log("select_db.test 2:1:", tick_info.max === AVAL_SUPPLY)
        console.log("select_db.test 2:2:", tick_info.tick === AVAL_TICK)
        pool.end()
    })
}
run()