import * as fs from "fs"
import { INDEXER_DEFAULT_LAST_BLOCK, INDEXER_SCAN_LAST_BLOCK_FILEPATH } from "../constant"

export const set_indexer_last_block = async (block_number: number, divpath?: string) => {
    if(block_number !== parseInt(block_number.toString())){
        return console.log('error: set_indexer_last_block')
    }
    fs.writeFileSync(divpath || INDEXER_SCAN_LAST_BLOCK_FILEPATH, block_number.toString())
}
export const get_indexer_last_block = async (divpath?: string) => {
    try {
        const res = await fs.readFileSync(divpath || INDEXER_SCAN_LAST_BLOCK_FILEPATH)
        const last_block_number = parseInt(res.toString()) || INDEXER_DEFAULT_LAST_BLOCK
        return last_block_number
    } catch (error) {
        return INDEXER_DEFAULT_LAST_BLOCK
    }
}