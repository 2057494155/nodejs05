/**
 *  mongoose 所有API都支持 Promise
 */
var mongoose = require('mongoose')

User.findOne({
  username: 'admin'
})
  .then(function (user) {
    if (user) {
      // 用户已存在,不能注册
      console.log('用户已存在')
    }else {
      return new User({
        username: 'aaa',
        password: '123',
        email: 'adad'
      }).save()
    }
  })
  .then(function(ret){
      // 之后的操作
  })
