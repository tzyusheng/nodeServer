// //  db.js 
// const mysql = require('mysql')
// const config = require('./config')
// let pool = mysql.createPool({
//     host: config.mysqlInfo.host,
//     port: config.mysqlInfo.port,
//     database: config.mysqlInfo.database,
//     user: config.mysqlInfo.user,
//     password: config.mysqlInfo.password,
//     // multipleStatements: true
// });

// exports.query = async(sql) => {
//     return new Promise((resolve, reject) => {
//         pool.getConnection(function(err, connection) {
//             if (err) {
//                 console.log("建立连接失败", err);
//                 reject("sql error")
//             } else {
//                 // console.log("建立连接成功");
//                 // console.log(pool._allConnections.length); //  1
//                 pool.query(sql, function(err, rows) {
//                     if (err) {
//                         console.log("查询失败", err);
//                         reject("select error")
//                     } else {
//                         // console.log(rows);
//                         resolve(rows);
//                     }
//                     connection.destroy()
//                         // console.log(pool._allConnections.length); // 0
//                 })
//             }
//             // pool.end()
//         })

//     })
// };