/*
    students.js
    数据操作文件模块
    职责:   操作文件中的数据 , 只处理数据,  不关心业务
 */

var dbPath = './db.json'

// 增删改查的方法封装

// ! 使用回调函数来实现异步操作的结果

var fs = require('fs')

/*获取所有学生列表 */
exports.find = function (callback) {
  fs.readFile(dbPath, 'utf8' , function (err, data) {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  // 不直接callback(data)原因:无法区别两个对象(err和data)
  })
}

exports.findById = function (id, callback) {
  fs.readFile(dbPath, 'utf8' , function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students
    // 不直接callback(data)原因:无法区别两个对象(err和data)
    var ret = students.find(function (item) {
      return item.id === parseInt(id)
    })
    callback(null, ret)
  })
}

/* 添加保存 */
exports.save = function (student, callback) {
  fs.readFile(dbPath, 'utf8' , function (err, data) {
    if (err) {
      return callback(err)
    }

    var students = JSON.parse(data).students
    // 处理 id ,避免重复
    student.id = students[students.length - 1].id + 1

    // 把用户传递的数据保存到数组中
    students.push(student)

    // 把对象数据转换为字符串
    var fileData = JSON.stringify({
      students: students
    })

    // 把字符串保存到文件中
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        // 错误就是把错误对象传递给它
        return callback(err)
      }
      // 成功就没错,所以错误对象是null
      callback(null)
    })
  })
}

/* 更新学生 */
exports.updateById = function (student, callback) {
  fs.readFile(dbPath, 'utf8' , function (err, data) {
    if (err) {
      return callback(err)
    // 抛出,让调用者自己处理
    }
    var students = JSON.parse(data).students

    // 你要修改谁,就要把谁找出来    根据ID
    /**
     *! find 是 ES6 中的一个数组方法
     *! 需要接受一个函数作为参数
     *! 当某个遍历项符合 item.id === student.id 条件的时候
     *! find 会终止遍历,同时返回遍历项  item
    **/
    student.id = parseInt(student.id)

    // 注意：这里记得把 id 统一转换为数字类型
    student.id = parseInt(student.id)

    var stu = students.find(function (item) {
      return item.id === student.id
    })
    // 遍历拷贝对象
    // 覆盖式
    for (var key in student) {
      stu[key] = student[key]
    }

    // 转成字符串
    var fileData = JSON.stringify({
      students: students
    })

    // 写入文件
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

/* 删除学生 */
exports.deleteById = function (id, callback) {
  fs.readFile(dbPath, 'utf8' , function (err, data) {
    if (err) {
      return callback(err)
    // 抛出,让调用者自己处理
    }
    var students = JSON.parse(data).students

    //! findIndex 方法专门用来 根据条件查找元素的下标
    //! 返回的是下标
    var deleteId = students.findIndex(function(item){
      return item.id === parseInt(id)
    })

    //splice(start,几个元素)
    // 根据下标 将学生 删除
    students.splice(deleteId,1)

    //! 重写
    var fileData = JSON.stringify({
      students: students
    })
    // 写入文件
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}
