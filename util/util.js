// const xml2js = require('xml2js')
// const request = require('request')
// const querystring = require('querystringify')
// const config = require('./config')
// const fs = require('fs')
// const baidu = require('./baidu')
// const db = require('./sql')
// const userinfo = {
//     username: config.userInfo.username,
//     password: config.userInfo.password
// }
// let accessIntertval;
// const cidUrl = "https://khoatoantin.com/ajax/cidms_api?"
// const pidUrl = "https://khoatoantin.com/ajax/pidms_api?justgetdescription=0&"

// exports.parseXMLAsync = function(xml) {
//     return new Promise(function(resolve, reject) {
//         xml2js.parseString(xml, { trim: true }, function(err, content) {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(content)
//             }
//         })
//     })
// }

// // function formatMessage(result) {
// //     var message = {}
// //     if (typeof result === 'object') {
// //         var keys = Object.keys(result);

// //         for (var i = 0; i < keys.length; i++) {
// //             var item = result[key[i]]
// //             var key = keys[i]

// //             if (!(item instanceof Array) || item.length === 0) {
// //                 continue
// //             }

// //             if (item.length === 1) {
// //                 var val = item[0]
// //                 if (typeof val === 'object') {
// //                     message[key] = formatMessage(val)
// //                 } else {
// //                     message[key] === (val || '').trim()
// //                 }
// //             } else {
// //                 message[key] = []
// //                 for (var j = 0, k = item.length; j < k; j++) {
// //                     message[key].push(formatMessage(item[j]))
// //                 }
// //             }


// //         }
// //     }
// // }

// exports.formatMessage = function(xml) {
//     return new Promise(function(resolve, reject) {
//         xml2js.parseString(xml, { trim: true }, function(err, content) {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(content.xml)
//             }
//         })
//     })
// }


// // 获取id和验证秘钥
// exports.getId = (id) => {
//         return new Promise(async(resolve, reject) => {
//             let [state, url] = await iidsDetection(id)
//             if (state === "error") {
//                 let cid = `安装id:\n ${url.cid}\n错误的安装ID,请认真核对！`
//                 let pid = `秘钥:\n ${url.pid}\n错误的秘钥,请认真核对！`
//                 return url.cid ? reject(cid) : reject(pid)
//             } else if (state === "error1") {
//                 return reject(`未识别内容--${url}`)
//             }
//             let data = querystring.stringify(userinfo)
//             const requestUrl = url + data;
//             console.log(requestUrl);
//             request({
//                     url: requestUrl,
//                     method: "POST",
//                     json: true,
//                     headers: {
//                         "content-type": "application/json",
//                     },
//                 },
//                 function(error, response, body) {
//                     if (!error && response.statusCode == 200) {
//                         // 请求成功的处理逻辑
//                         if (state == "cid") {

//                             resolve(`确认ID:\n${body.confirmationid}`)
//                         } else {
//                             let pids = ""
//                             let date = getDate()
//                             body.forEach((el, index) => {
//                                 pids += `${index==0?'':'\n'}第${index+1}条:\n密钥: ${el["keyname_with_dash"]}\n密钥版本: ${el.prd}\n错误代码: ${el.errorcode}\n测试时间: ${date}`
//                             });
//                             resolve(pids)
//                         }

//                     }
//                     reject("错误的key")
//                 })

//         })

//     }
//     // 文字识别
// exports.imgTotext = (url) => {
//     return new Promise(async(resolve, reject) => {
//         let imgBase64 = await imgToBase64(url)
//         baidu.imgOcr.accurateBasic(imgBase64).then(function(result) {
//             let resTexts = result["words_result"]
//             let text = ''
//             for (let i = 0; i < resTexts.length; i++) {
//                 text += resTexts[i].words
//             }
//             resolve(text)
//         }).catch(function(err) {
//             // 如果发生网络错误
//             reject(err)
//         });

//     })
// }

// exports.getAccessToken = () => {
//     return new Promise((resolve, reject) => {
//         request({
//                 url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appID}&secret=${config.appSecret}`,
//                 method: "GET",
//                 json: true,
//                 headers: {
//                     "content-type": "application/json",
//                 },
//             },
//             function(error, response, body) {
//                 if (!error && response.statusCode == 200) {
//                     resolve(body.access_token)
//                 }
//                 reject("失败")
//             })
//     })
// }

// // 获取用户列表 openid
// exports.getUserList = () => {
//         return new Promise((resolve, reject) => {
//             request({
//                     url: `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${config.accessToken}`,
//                     method: "GET",
//                     json: true,
//                     headers: {
//                         "content-type": "application/json",
//                     }
//                 },
//                 function(error, response, body) {
//                     if (!error && response.statusCode == 200) {
//                         if (body.errcode) {
//                             return reject(`错误码${body.errcode}`)
//                         }
//                         return resolve(body.data.openid)
//                     }
//                     reject("失败")
//                 }
//             )
//         })
//     }
//     // let userCount = {}
// exports.userCount1 = () => {
//     return false
// }
// exports.userCount = async(openid) => {
//     let selestUserinfosql = `select * from userinfo where openid='${openid}'`
//     let userinfo = await db.select(selestUserinfosql)
//     let count = 1;
//     if (userinfo.length > 0) {
//         console.log("有数据");
//         count = userinfo[0].count++
//             console.log(count);
//         let updataUserinfo = `update userinfo set count='${userinfo[0].count++}',time='${getDate()}' where openid='${openid}'`
//         let res = db.updata(updataUserinfo)
//             // console.log(res);
//             //     console.log(config.countUser);
//             // config.countUser[openid]++
//     } else {
//         let addSql = `INSERT INTO userinfo(openid,count,time) VALUES ('${openid}','1','${getDate()}')`
//         let addres = await db.add(addSql)
//         console.log(addres);
//     }
//     if (count > 5) {
//         return true
//     } else {
//         return false
//     }
// }
// exports.updateAccessToken = async() => {
//     let date = getDate();
//     let selectATtiemsql = 'select * from accesstime'
//     let acsTime = await db.select(selectATtiemsql)
//     let start, dataAccesstoken, timeNum = 2;
//     console.log(acsTime);
//     if (acsTime.length == 0) {
//         let addAccesstokensql = `insert into accesstime values('${await this.getAccessToken()}','${date}')`
//         let addlog = await db.add(addAccesstokensql)
//         console.log(addlog);
//     } else {
//         start = acsTime[0].time;
//         dataAccesstoken = acsTime[0].accesstoken;
//         timeNum = getHour(start.toString(), date);
//     }

//     if (timeNum >= 2) {
//         let accesstoken = await this.getAccessToken()
//         config.accessToken = accesstoken;
//         console.log(accesstoken);
//         let updateTimesql = `UPDATE accesstime set accesstoken='${accesstoken}',time='${date}' where accesstoken='${dataAccesstoken}'`
//         let updataRes = await db.updata(updateTimesql)
//         clearInterval(accessIntertval)
//         accessIntertval = setIntervalAccesstoken();
//     } else {
//         config.accessToken = dataAccesstoken;
//         clearInterval(accessIntertval)
//         let time = (2 - timeNum) * 1000 * 60 * 60
//         accessIntertval = setIntervalAccesstoken(time);
//     }

// }


// // 判断id是否符合规则
// function iidsDetection(iids) {

//     const CID = iids.replace(/[^0-9]/ig, "").toString();
//     const PID = iids.replace(/[^0-9a-zA-Z]/ig, "")
//     if (CID.length == 0 || PID.length == 0) {
//         return ["error1", iids]
//     }
//     if (PID.length == 25) {
//         userinfo.keys = PID
//         return ["pid", pidUrl]
//     } else if (PID.length % 25 == 0) {
//         let PIDS = ''
//         for (let i = 0; i < PID.length / 25; i++) {
//             PIDS += PID.slice(i * 25, (i + 1) * 25)
//             if (i + 1 < PID.length / 25) {
//                 PIDS += "\\r"
//             } else {
//                 PIDS += "&"
//             }
//         }
//         userinfo.keys = PIDS
//         return ["pid", pidUrl]
//     } else if (CID.length < 20) {
//         return ["error", { pid: iids }]
//     } else if (CID.length == 63 || CID.length == 54) {
//         userinfo.iids = CID
//         return ["cid", cidUrl]
//     } else {
//         let ciderr = ""
//         for (let i = 0; i < CID.length / 7 && i < 9; i++) {
//             ciderr += CID.slice(i * 7, (i + 1) * 7)
//             if (i + 1 < CID.length / 7 && i + 1 < 9) {
//                 ciderr += "-"
//             } else {
//                 ciderr += CID.slice(8 * 7, CID.length)
//             }
//         }
//         return ["error", { cid: ciderr }]
//     }

// }
// // 获取最新时间
// function getDate() {
//     let now = new Date();
//     let year = now.getFullYear();
//     let month = now.getMonth() + 1;
//     let date = now.getDate();
//     let hour = now.getHours();
//     let minute = now.getMinutes();
//     let second = now.getSeconds();
//     return `${year}-${month}-${date} ${hour}:${minute}:${second}`
// }

// // 在线图片转为base64位
// function imgToBase64(url) {
//     return new Promise((resolve, reject) => {
//         request.get({ uri: encodeURI(url), encoding: 'binary' }, (err, res) => {
//             if (!err) {
//                 let base64str = Buffer.from(res.body, 'binary').toString('base64');
//                 resolve(base64str);
//             }
//             reject("失败")
//         })
//     })
// }

// function getHour(s1, s2) {
//     s1 = new Date(s1.replace(/-/g, '/'));
//     s2 = new Date(s2.replace(/-/g, '/'));
//     var ms = Math.abs(s1.getTime() - s2.getTime());
//     return ms / 1000 / 60 / 60;
// }

// function setIntervalAccesstoken(time = 1000 * 60 * 60 * 2) {
//     getWxUserinfo('og2Vg6UyewXs4YzpqaZ4YQFV3KnE')
//     return setInterval(() => {
//         this.updateAccessToken()
//     }, time)
// }


// function getWxUserinfo(openid) {
//     console.log(config.accessToken, "---------------------------------");
//     let url = `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${config.accessToken}&openid=${openid}`
//     request({
//         url,
//         method: "GET",
//         json: true,
//         headers: {
//             "content-type": "application/json",
//         }
//     }, function(err, res, data) {
//         if (!err) {
//             console.log(data);
//         }
//     })
// }