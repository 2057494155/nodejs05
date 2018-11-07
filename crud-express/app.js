/*
* app.js  入口模块
  职责:
      启动服务
      做一些服务相关配置
        模板引擎
        bod-parser 解析表单 POST 请求体数据
        提供静态资源
      挂载路由
      监听端口启动服务

*/

var express = require('express')
var router = require('./router')
var app = express()
var bodyParser = require('body-parser')

//! 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.engine('html', require('express-art-template'))
// express-art-template 包会自动加载 art-template

app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))
// nodejs04\crud-express\node_modules\bootstrap\dist\css\bootstrap.min.css
// 开放 node_modules 目录,索引是 node_modules

//把路由容器挂载到 app 服务中
app.use(router)

app.listen(3000, function () {
  console.log('running')
})

