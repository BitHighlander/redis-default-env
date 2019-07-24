let {redis,publisher,subscriber} = require("../index.js")

require("dotenv").config()
//require("dotenv").config({path:'../.env'})


/*
write
 */

redis.set("test","foo")
	.then(function(resp){
		console.log("resp: ",resp)
	})


/*
Read
 */

redis.get("test")
	.then(function(resp){
		console.log("resp: ",resp)
	})


subscriber.subscribe("COSMOS")
subscriber.on('message', async function (channel, payloadS) {
	let tag = TAG + ' | events | '
	try {
		let payload = JSON.parse(payloadS)
		console.log("payload: ",payload)
		//on block ingest block

		//if tx
		//push to broadcast queue

	}catch(e){
		log.error(tag,e)
		throw e
	}
})
