var mysql = require('mysql')

//  1. 创建连接
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'库名'     //数据库名称
})
// 2. 连接数据库    打开冰箱门
connection.connect()

// 3. 执行数据操作      把大象装进冰箱/*  */
connection.query('SELECT * FROM `库名`',function(err,ret,field){
    if(err) throw err
    console.log('THE solution is :',ret[0].solution);
})

// connection.query('INSERT INTO 库名 VALUES("admin","123456")')

// 4. 断开连接      关上冰箱门
connection.end()
