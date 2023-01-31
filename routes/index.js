const router = require('koa-router')()
const getRawBody = require("raw-body");
const wx = require("../util/wx");
const util = require("../util/util")

// router.get("/wx", async(ctx, next) => {
//     await wx.verifyUser(ctx)
// })

// router.post("/wx", async(ctx, next) => {
//     await wx.infoHandle(ctx)
// })
router.get('/',async(ctx,next)=>{
    ctx.body = '11111111111111111111111111'
} )
module.exports = router