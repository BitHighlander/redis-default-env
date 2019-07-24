let {redis,publish,subscribe} = require("../index.js")

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