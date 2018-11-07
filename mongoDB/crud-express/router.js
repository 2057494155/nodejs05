// 路由
/*
    router.js 路由模块
    职责:
        处理路由
        根据不同的 请求方法 + 请求路径 设置具体的 请求函数

    模块职责有要单一,不要乱写(尤其是文件名)
    划分模块的目的就是为了增强代码的可维护性
    提升开发效率
*/
var express = require('express')

// !express 提供了一种更好的方式 express.Router()
// !专门用来包装路由的
/*
    1. 创建一个路由容器
    2. 把路由都挂载到 router 中
    3. 把 router 导出
*/
var router = express.Router()
var Student = require('./students')

/**渲染学生列表页面 */
router.get('/students', function (req, res) {
  Student.find(function (err, students) {
    if (err) {
      return res.status(500).send('Server error')
    // 建议加入状态码,更合理
    }
    res.render('index.html', {
      fruits: [
        '苹果',
        '香蕉',
        '橘字'
      ],
      students: students
    })
  })
})
router.get('/students/new', function (req, res) {
  res.render('new.html')
})

router.post('/students/new', function (req, res) {
  /*
     1. 获取表单数据
     2. 处理
        将数据保存到 db.json 中,用以持久化
          先读取 db.json
           转成对象
           往对象中 push
             再转成字符串
              最后把字符串在此写入文件 db.json 中
     3. 发送响应
  */
  new Student(req.body).save(function (err) {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('/students')
  })
})

/**  渲染编辑学生页面*/
router.get('/students/edit', function (req, res) {
  /**
   *  1. 在客户端的列表页面中处理链接问题 href="/students/edit?id={{$value.id}}" (需要有 id 参数)
   *  2. 获取要编辑的学生 id ==> req.query.id
   *  3. 渲染编辑页面:
   *        根据 id 把学生信息查出来
   *        使用模板引擎渲染页面
   */

  // })
  Student.findById(req.query.id.replace(/"/g,''), function (err, student) {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.render('edit.html', {
      student: student
    })
  })
})

/** 处理编辑学生 */
router.post('/students/edit', function (req, res) {
  /**
   * 1. 获取表单数据    req.body
   * 2. 更新
   *      Student.updateById()
   * 3. 发送响应
   */
  Student.findByIdAndUpdate(req.body.id.replace(/"/g,''),req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('/students')
  })
})

/**
 * 处理删除学生
 * 1. 获取要删除的 id
 * 2. 根据 id 执行删除操作
 * 3. 根据结果发送响应
 */
router.get('/students/delete', function (req, res) {
  // console.log(req.query.id)
  Student.findByIdAndRemove(req.query.id.replace(/"/g,''), function (err) {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('/students')
  })
})


module.exports = router

/**
 * 先写调用,再去封装
 */
