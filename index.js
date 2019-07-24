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
let log = require("loggerdog-client")()
let Redis = require("ioredis");

log.info(process.env.REDIS_CONNECTION)

let redis
let publisher
let subscriber

let redis0
let redis1
let redis2

//ask master
let getMaster = async function(){
	let tag = TAG + " | getMaster | "
	try{
		let isMaster0 = await redis0.role()
		if(isMaster0[0] === 'master') redis = redis0
		let isMaster1 = await redis1.role()
		if(isMaster0[0] === 'master') redis = redis1
		let isMaster2 = await redis2.role()
		if(isMaster0[0] === 'master') redis = redis2

		log.info("isMaster0: ",isMaster0)
		log.info("isMaster1: ",isMaster1)
		log.info("isMaster2: ",isMaster2)

	}catch(e){
		log.error(tag,e)
	}
}


if(process.env.NODE_ENV === 'production'){
	log.info(TAG,"Production redis cluster detected")
	redis0 = new Redis(process.env.REDIS_CONNECTION_CLUSTER_0)
	redis1 = new Redis(process.env.REDIS_CONNECTION_CLUSTER_1)
	redis2 = new Redis(process.env.REDIS_CONNECTION_CLUSTER_2)

	redis = redis0
	//pub/sub can be anything
	publisher = redis0
	subscriber = redis0


	getMaster()
} else {
	redis = new Redis(process.env.REDIS_CONNECTION)
	publisher = new Redis(process.env.REDIS_CONNECTION)
	subscriber = new Redis(process.env.REDIS_CONNECTION)
}




module.exports = {redis, publisher, subscriber}
