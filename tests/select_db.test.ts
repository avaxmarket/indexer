import { AVAL_LIM, AVAL_SUPPLY, AVAL_TICK } from "../src/constant";
import { pool } from "../src/db/pool";
import { get_avax_insc_block_info, get_avax_insc_blocks_info } from "../src/db/select/block";
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
    
    // const block_info = await get_avax_insc_block_info(37992982)
    // console.log('block_info::',block_info)

    // const blocks = await get_avax_insc_blocks_info(37932982, 37932983)
    // console.log('select_db blocks 1:', blocks[0].block_data.result.transactions[0].from)

    const blocks = await get_avax_insc_blocks_info(38332990, 38332994)
    console.log('select_db blocks ---1:', blocks[0].block_number == '38332990')
    console.log('select_db blocks ---2:', blocks[1].block_number == '38332991')
    console.log('select_db blocks ---3:', blocks[2].block_number == '38332992')
    console.log('select_db blocks ---4:', blocks[3].block_number == '38332993')
    console.log('select_db blocks ---5:', blocks[4].block_number == '38332994')

    const result = await pool.query(`SELECT amt, max, tick FROM avax_tick WHERE tick = ?`, [AVAL_TICK])
    const tick_info = result[0][0] as unknown as db_tick_info
    console.log("select_db.test 2:1:", tick_info.max === AVAL_SUPPLY)
    console.log("select_db.test 2:2:", tick_info.tick === AVAL_TICK)
    await pool.end()
}
run()