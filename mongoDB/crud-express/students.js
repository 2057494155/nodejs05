var mongo = require('mongoose')

var Schema = mongo.Schema

//不能忘了连接数据库,默认端口 27017
mongo.connect('mongodb://localhost/miao',{useMongoClient:true})

var studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    enum: [0, 1], // 枚举,只能是1, 0
    default: 0 // 默认 0
  },
  age: {
    type:Number
  },
  hobbies: {
    type:String
  }
})

// 直接出模型构造函数
module.exports = mongo.model('Student', studentSchema)
