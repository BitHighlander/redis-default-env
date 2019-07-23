let {redis,publish,subscribe} = require("../index.js")


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