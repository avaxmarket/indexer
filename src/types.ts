export interface db_interface_block_json {
    id: string;
    timestamp: string;
    number: string;
    result: {
        from: string;
        to: string;
        hash: string;
        input: string;
        transactionIndex: string;
    }[]
}
type p = 'asc-20'
export type scan_json_type = {
    p: p;
    op: 'deploy';
    tick: string;
    max: string;
    lim: string;
} | {
    p: p;
    op: 'mint';
    tick: string;
    amt: string;
} | {
    p: p;
    op: 'transfer';
    tick: string;
    vin: {
        txid: string;
        vout: string;
    }[];
    vout: {
        amt: string;
        scriptPubKey: {
            addr: string;
        };
    }[];
}
export interface db_tick_info {
    amt: number;
    max: number;
    tick: string;
    holder: number;
    creator: string;
    json: string;
    last_time: number;
    lim: number;
    deploy_time: number;
}
export interface db_utxo_info {
    user_id: number;
    txid: string;
    value: string;
    owner: string;
    index: number;
    confirmed: number;
    tick: string;
    vin_hash: string;
}