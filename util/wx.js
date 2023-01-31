// const sha1 = require("sha1");
// const getRawBody = require("raw-body");
// // const Wechat = require("./wechat");
// const util = require("./util");
// const config = require('./config')
// let msgid = ''

// exports.verifyUser = async(ctx) => {
//     let { sha, signature, echostr } = await getSha(ctx);
//     if (sha === signature) {
//         ctx.body = echostr;
//     } else {
//         ctx.body = "err";
//     }
// }

// exports.infoHandle = async(ctx) => {
//     let { sha, signature } = await getSha(ctx);
//     if (sha !== signature) {
//         ctx.body = "err";
//         return false;
//     }
//     const data = await getRawBody(ctx.req, {
//         length: ctx.req.length,
//         limit: "1mb",
//         encoding: ctx.req.charset
//     });
//     // const content = await util.parseXMLAsync(data);
//     const message = await util.formatMessage(data);
//     const openID = message.FromUserName
//     if (msgid !== message.MsgId) {
//         if (await util.userCount(openID)) {
//             msgid = message.MsgId
//             await sendXml(message, ctx, '你的次数达到了上限', true);
//             return true;
//         }
//     }
//     if (message.MsgType[0] === "text") {
//         console.log("发送了文字");
//         const iids = message.Content[0];
//         await sendXml(message, ctx, iids);
//     } else if (message.MsgType[0] === "image") {
//         console.log("发送了图片");
//         let picUrl = message.PicUrl[0]
//         let imgText = await util.imgTotext(picUrl)
//         console.log(imgText);
//         await sendXml(message, ctx, imgText)

//     }
// }

// getSha = (ctx) => {
//     const token = config.token;
//     const signature = ctx.request.query.signature;
//     const nonce = ctx.request.query.nonce;
//     const timestamp = ctx.request.query.timestamp;
//     const echostr = ctx.request.query.echostr;
//     const str = [token, timestamp, nonce].sort().join("");
//     const sha = sha1(str);
//     return {
//         signature,
//         sha,
//         echostr
//     }
// }

// async function sendXml(message, ctx, iids, log = false) {
//     let activationCode = log ? iids : await util.getId(iids).then(value => value, err => err);
//     ctx.status = 200;
//     ctx.type = "application/xml";
//     const now = new Date().getTime();
//     ctx.body = `
//         <xml>
//         <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
//         <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
//         <CreateTime>${now}</CreateTime>
//         <MsgType><![CDATA[text]]></MsgType>
//         <Content><![CDATA[${activationCode}]]></Content>
//         <MsgId>1234567890123456</MsgId>
//       </xml>
//         `;
//     return;
// }

// async function getAccessToken() {
//     let accessToken = await util.getAccessToken()

//     if (accessToken) {
//         console.log("获取accessToken成功");
//         console.log(config.accessToken);
//     }
//     return accessToken
// }

// util.updateAccessToken()