var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', {useMongoClient: true})

mongoose.Promise = global.Promise

var Cat = mongoose.model('Cat', {name: String})
/**
 * 创建一个模型
 * 就是在设计数据库
 * MongoDB 是动态的,非常灵活,只要在代码中设计你的数据库就行了
 * mongoose 这个包就可以让你的设计编写过程变得非常简单
 * 最终叫 cats 
 */
for (var i = 0; i < 100; i++) {
  var kitty = new Cat({name: '妙啊 * ' + i})
  //   实例化一个Cat

  kitty.save(function (err) {
    if (err) {
      console.log(err)
    }else {
      console.log('MEOW')
    }
  })
// 持久化保存 Kitty 实例
}
