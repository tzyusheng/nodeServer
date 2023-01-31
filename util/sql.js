// const db = require('./db')
// exports.select = async(sql) => {
//     let selectData = await db.query(sql)
//     return selectData
// }
// exports.del = async(sql) => {
//     let delLog = await db.query(sql)
//     if (delLog === 'select error') {
//         return 'sql语句错误'
//     } else if (delLog.protocol41) {
//         return `删除成功,删除数量${delLog.affectedRows}`
//     }
// }
// exports.add = async(sql) => {
//     let addLog = await db.query(sql).then(val => val, err => err)
//     if (addLog === 'select error') {
//         return 'sql语句错误'
//     } else if (addLog.protocol41) {
//         return `添加成功,添加数量${addLog.affectedRows}`
//     }

//     // return addLog.catch(err, err)
// }
// exports.updata = async(sql) => {
//     let upDataLog = await db.query(sql)
//     if (upDataLog === 'select error') {
//         return 'sql语句错误'
//     } else if (upDataLog.protocol41) {
//         return `添加成功,添加数量${upDataLog.affectedRows}`
//     }
//     console.log(upDataLog);
// }