var fs = require('fs')

var p1 = new Promise(function (resolve, reject) {
  fs.readFile('./data/a.txt', 'utf8', function (err, data) {
    if (err) {
      reject(err)
    }else {
      resolve(data)
    }
  })
})
var p2 = new Promise(function (resolve, reject) {
    fs.readFile('./data/b.txt', 'utf8', function (err, data) {
      if (err) {
        reject(err)
      }else {
        resolve(data)
      }
    })
  })
  var p3 = new Promise(function (resolve, reject) {
    fs.readFile('./data/c.txt', 'utf8', function (err, data) {
      if (err) {
        reject(err)
      }else {
        resolve(data)
      }
    })
  })


p1
  .then(function(data){
      console.log(data);
      //当 p1 读取成功的时候
      // 当前函数的 return 的结果就可以在后面的 then 中的 function 中接收到
      //    我们可以 return 一个 Promise 对象
      // 当 return 一个 Promise 对象的时候,
      //  !      后续的 then 函数中 方法的第一个参数会作为 p2 的 resolve
        //  !    第二个参数会作为 p2 的 reject
      return p2
  },function(err){
      console.log('读取文件失败了',err);
  })
  .then(function(data){
      console.log(data);//上面return的是什么 ,这里就是啥
      return p3
  })
  .then(function(data){
      console.log(data);
      console.log('end');
  })