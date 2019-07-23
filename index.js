/*
	Default redis tool
				- Highlander

	Requirements:

	* Allow connection import via process_env
	* If connection not found (throw error)
	* If error, don't spam reconnect

	TODO
	* version control schema's (if version mismatch from stored redis value throw error)
	* Allow override via init

 */



/**
 * Created by highlander on 3/6/17.
 */

let TAG = " | REDIS-CONNECTION-MODULE | "

let config = {}
config.REDIS_CONNECTION = process.env.REDIS_CONNECTION || "redis://127.0.0.1:6379"

let subscriber
let publisher
let redis
try{
	const pubsub = require('redis')
	publisher = pubsub.createClient(config.REDIS_CONNECTION)
	subscriber = pubsub.createClient(config.REDIS_CONNECTION)

	const Redis = require('then-redis/lib')
	redis = Redis.createClient(config.REDIS_CONNECTION)
}catch(e){
	console.error(TAG+"e: ",e)
	//if prod, throw
	if(process.env("NODE_ENV") === 'production') throw Error("101: Redis misconfiguration! ")
}

module.exports = {redis, publisher, subscriber}
