import { continuous_block } from "../src/utils/continuous_block"

{
    const continuous_block_arr = [1, 2, 3, 4, 5]
    console.log('continuous block 1::', 
        continuous_block(continuous_block_arr).last_number === 5,
        continuous_block(continuous_block_arr).last_index === 4,
        continuous_block_arr[continuous_block(continuous_block_arr).last_index] === 5
    )
}
{
    const continuous_block_arr = [1, 2, 3, 4, 5, 8]
    console.log('continuous block 2::', 
        continuous_block(continuous_block_arr).last_number === 5,
        continuous_block(continuous_block_arr).last_index === 4,
        continuous_block_arr[continuous_block(continuous_block_arr).last_index] === 5
    )
}
{
    const continuous_block_arr = [1, 2, 3, 4, 5, 6, 8]
    console.log('continuous block 3::', 
        continuous_block(continuous_block_arr).last_number === 6,
        continuous_block(continuous_block_arr).last_index === 5,
        continuous_block_arr[continuous_block(continuous_block_arr).last_index] === 6
    )
}
{
    const continuous_block_arr = [1, 2, 3, 4, 5, 6, 8]
    console.log('continuous block 4::', 
        JSON.stringify(continuous_block_arr.slice(
            0, 
            continuous_block(continuous_block_arr).last_index + 1
        )) === JSON.stringify([1, 2, 3, 4, 5, 6])
    )
}
{
    const continuous_block_arr = [1, 2, 3, 4, 5, 6, 8]
    console.log('continuous block 5::', 
        JSON.stringify(continuous_block(continuous_block_arr).able_block_number_array) === JSON.stringify([1, 2, 3, 4, 5, 6])
    )
}
{
    const continuous_block_arr = [2, 3, 4, 6, 8]
    console.log('continuous block 6::', 
        JSON.stringify(continuous_block(continuous_block_arr).able_block_number_array) === JSON.stringify([2, 3, 4])
    )
}
{
    const continuous_block_arr = [2, 4, 4, 6, 8]
    console.log('continuous block 7::', 
        JSON.stringify(continuous_block(continuous_block_arr).able_block_number_array) === JSON.stringify([2])
    )
}
{
    const continuous_block_arr = []
    console.log('continuous block 8::', 
        JSON.stringify(continuous_block(continuous_block_arr).able_block_number_array) === JSON.stringify([])
    )
}
