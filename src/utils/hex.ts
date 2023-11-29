export function string_to_hex(str: string): string {
    return Buffer.from(str, 'utf-8').toString('hex')
}
export function hex_to_string(hex: string): string {
    return Buffer.from(hex, 'hex').toString()
}