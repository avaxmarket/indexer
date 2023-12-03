import { pool } from "../src/db/pool";
import * as parse from "csv-parse/lib/sync"
import * as fs from "fs"

import * as csvParser from 'csv-parser';
import BigNumber from "bignumber.js";

interface DBRow {
    // txid: string, value: string, owner: string,
    // index: number, confirmed: number, tick: string,
    // block_number: number
    "SUM(`value`)": string;
}
interface CSVRow {
    Rank: string;
    Address: string;
    Amount: string;
    Tokens: string;
  }
const run = async () => {

    const avb_rustlt = await pool.query('SELECT SUM(`value`) as total_balance FROM next_utxo WHERE `owner` = ?', [])
    console.log(avb_rustlt)
    return
    const results: CSVRow[] = [];
    fs.createReadStream('./1999eth_aval.csv').pipe(csvParser()).on('data', (data: CSVRow) => {
        results.push(data)
    }).on('end', async () => {
        console.log(
            results[0]
        )
        for await (const csv of results) {
            const avb_rustlt = await pool.query('SELECT SUM(`value`) as total_balance FROM next_utxo WHERE `owner` = ?', [])
            // if(avb_rustlt[0])
        }
    })
}

run()