export interface db_interface_block_json {
    id: string;
    timestamp: string;
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