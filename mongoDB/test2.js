var moo = require('mongoose')

var Schema = moo.Schema

// 1. 连接数据库
// !指定连接的数据库不需要存在,当你插入第一条数据之后就会自动创建出来
moo.connect('mongodb://localhost/miao')

// 2. 设计文档结构 (表结构)
// 字段名就是表结构中的属性名称
// 值
// 约束目的是为了保证数据的完整性
// 不要有脏数据
var userSchema = new Schema({
  username: {
    type: String,
    required: true, // 必须有
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }

})

// ! 3. 将文档架构,发布为模型
/*mongoose.model() 方法就是用来将一个架构发布为 model
*第一个参数:传入一个大写名词单数字符串用来标识你的数据库名称
 *            mongoose 会自动将大写名词的字符串生成小写复数的集合名称
*                例如这里的 User 最终会变成 users 集合名称
*第二个参数: 架构 Schema
*
 * 返回值:模型对象(模型构造函数)
*/
var User = moo.model('User', userSchema)

// 4.当我们有了模型构造函数之后,就可以使用这个模型构造函数对 users 集合的数据为所欲为了
// 增删改查

// *******************************
// 新增数据
// *******************************

var admin = new User({
  username: 'zs',
  password: '123456',
  email: 'admin@admin.com'
})

admin.save(function (err, ret) {
  if (err) {
    console.log('保存失败')
  }else {
    console.log('保存成功')
    console.log(ret)
  }
})

// *******************************
// 查询数据
// *******************************

// 查询所有
User.find(function (err, ret) {
  if (err) {
    console.log('查询失败')
  }else {
    console.log('无差别查询')
    console.log(ret)
  }
})

// 按条件查询
User.find({
  username: 'zs'
}, function (err, ret) {
  if (err) {
    console.log('查询失败')
  }else {
    console.log('按条件查询')
    console.log(ret)
  }
})

// 只找匹配的第一个
User.findOne({
  username: 'zs'
}, function (err, ret) {
  if (err) {
    console.log('查询失败')
  }else {
    console.log('按条件只找一个')
    console.log(ret)
  }
})

// 只找第一个插入的数据
User.findOne(function (err, ret) {
  if (err) {
    console.log('查询失败')
  }else {
    console.log('只找第一个')
    console.log(ret)
  }
})



// *******************************
// 删除数据
// *******************************

User.remove({
  username: 'zs'
}, function (err) {
  if (err) {
    console.log('删除失败')
  }else {
    console.log('删除成功')
  }
})

// *******************************
// 更新数据(修改)
// *******************************

//findOneAndUpdate()
User.findByIdAndUpdate('5be18100d01ef32de09a8253',{
  password:'123'
},function(err,ret){
  if (err) {
    console.log('更新失败');
  } else {
    console.log('更新成功');

    console.log(ret);
  }
})