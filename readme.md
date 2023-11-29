## config .env
MYSQL_HOST=127.0.0.1
MYSQL_USER=user
MYSQL_PW=pw


## ⚠️ Developer Notes:

* The order of transactions needs to be processed in the order of miner ⚒️ packaging to avoid inconsistency in multi-party index data
* Data conversion needs to support special characters, such as using Buffer to convert strings and hex
* Data acquisition and data processing are separated to ensure independent operation and make the indexer more pure
* Please use transactions to process data in blocks. There are only two outcomes for block processing: success or failure. The machining mark only moves when machining is completed successfully.
* Avax inscription starting height is 37932982
* Field types are strictly distinguished, even with weak language processing
* The default precision is 8
* The maximum deployment value is 9223372036854775807

## more

The index currently only supports aval