import { INDEXER_DEFAULT_LAST_BLOCK } from "../src/constant"
import { get_indexer_last_block, set_indexer_last_block } from "../src/utils/io"

const TEST_PATH = './test_last_block.avax'
const run = async () => {
    {
        let block_number = await get_indexer_last_block(Date.now().toString())
        console.log('get_indexer_last_block 1::', block_number === INDEXER_DEFAULT_LAST_BLOCK)
    }
    {
        let block_number = await get_indexer_last_block()
        console.log('get_indexer_last_block 2::', block_number === INDEXER_DEFAULT_LAST_BLOCK)
    }
    {
        await set_indexer_last_block(123, TEST_PATH)
        let block_number = await get_indexer_last_block(TEST_PATH)
        console.log('get_indexer_last_block 3::', block_number === 123)
    }
    {
        await set_indexer_last_block(123321, TEST_PATH)
        let block_number = await get_indexer_last_block(TEST_PATH)
        console.log('get_indexer_last_block 4::', block_number === 123321)
    }
}
run()