import { AVAL_TICK, INDEXER_DEFAULT_LAST_BLOCK } from "../../constant"
import { db_interface_block_json, db_tick_info } from "../../types"
import { pool } from "../pool"

type results_type = {
    block_id: number,
    block_number: string;
    block_hash: string;
    block_data: {
        result: db_interface_block_json
    }
}[]
export const get_avax_insc_blocks_info = async (start_block_number: number, end_block_number: number): Promise<results_type> => {
    return (await pool.query(
        // `select block_data from block_json WHERE block_number >= ? AND block_number < ? limit ?`, 
        // `select block_data from block_json WHERE block_number BETWEEN ? AND ? limit ?`, 
        // [start_block_number, end_block_number + 1, end_block_number - start_block_number + 1], 
        `select * from block_json where 
        block_number >= (select block_number from block_json order by block_number limit ?, 1) 
        order by block_number limit ?`,
        [start_block_number - INDEXER_DEFAULT_LAST_BLOCK, end_block_number - start_block_number + 1]
    ))[0] as unknown as results_type
}


type result_type = {
    block_data: {
        result: db_interface_block_json
    }
}[]
export const get_avax_insc_block_info = async (block_number: number): Promise<result_type> => {
    return pool.query(
        `select * from block_json where block_number >= ? limit 1`,
        [block_number]
    ) as unknown as result_type
}