const id = (i: number) => i
export const continuous_block = (_block_number_arr: number[]) => {
    const block_number_arr = _block_number_arr.map(id)
    if(block_number_arr.length === 0 ){
        return {
            last_number: 0,
            last_index: 0,
            able_block_number_array: [],
        }
    }
    let last_number = block_number_arr[0]
    let last_index = 0
    for (const number of block_number_arr) {
        if(number !== last_number){
            continue
        }
        last_number ++ 
        last_index++
    }
    return {
        last_number: last_number - 1,
        last_index: last_index - 1,
        able_block_number_array: block_number_arr.slice(0, last_index),
    }
}