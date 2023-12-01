## What is ASC-20?

The ASC-20 inscription standard is unique to the Avalanche blockchain which standardizes the token protocol for inscriptions. On the Avalanche blockchain, anyone has the ability to deploy, mint, and trade ASC-20 inscriptions.

## Links

Market: https://avaxmarket.xyz \
Docs: https://docs.avaxmarket.xyz

## Config .env
MYSQL_HOST=127.0.0.1 \
MYSQL_USER=user \
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

## More

The index currently only supports aval


## DB

CREATE TABLE `avax_tick` (
  `tick` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `amt` bigint NOT NULL DEFAULT '0',
  `max` bigint NOT NULL DEFAULT '0',
  `holder` bigint NOT NULL DEFAULT '0',
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `json` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `last_time` int NOT NULL,
  `deploy_time` int NOT NULL,
  `lim` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`tick`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `utxo` (
  `user_id` int DEFAULT NULL,
  `txid` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `index` int NOT NULL,
  `confirmed` tinyint NOT NULL,
  `tick` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `vin_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`txid`,`index`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `user_transfer` (
  `from` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `to` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `vins` text COLLATE utf8mb4_general_ci NOT NULL,
  `vouts` text COLLATE utf8mb4_general_ci NOT NULL,
  `hash` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tick` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `block_number` int DEFAULT NULL,
  `time` int DEFAULT NULL,
  PRIMARY KEY (`hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `balance` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;