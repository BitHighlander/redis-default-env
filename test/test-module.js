let {redis,publish,subscribe} = require("../index.js")

//console.log(redis)
// redis.set("foo","bar",function(error,resp){
// 	console.log(error,resp)
// })

//console.log(redis)

// let run = async function(){
// 	console.log("run")
// 	let result = await redis.set("test","foo")
// 	console.log("result: ",result)
// 	let result1 = await redis.get("test","foo")
// 	console.log("result1: ",result1)
// }
// run()

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