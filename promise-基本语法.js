// 在 ES6中新增了一个API,Promise
// Promise是一个构造函数
var fs = require('fs')

/*  1.创建 Promise 容器 */
// 给别人一个承诺
// Promise 容器一旦创建,就开始执行里面的代码
console.log(1)

var p1 = new Promise(function (resolve, reject) {
  console.log(2)
  fs.readFile('./data/a.txt', 'utf8', function (err, data) {
    if (err) {
      //! 失败了,承诺容器中的任务失败了
      reject(err)
      //! 调用 reject 就相当于调用了 then 方法的第二个参数函数
    }else {
      // 承诺容器中的任务成功了
      // console.log(3)

      //! 把容器的 Pending 状态改为成功 Resolved
      resolve(data)
      //! 也就是说,这里调用的 resolve 方法其实就是 then 方法传递的那个 function
    }
  })
})

// console.log(4)
// 输出1243

// p1 就是那个承诺
// 当 p1 成功了, 然后 (then) 做指定的操作
// then() 方法接收的 function ,就是容器中的 resolve 函数
p1
  .then(function(data){
      console.log(data);
  },function(err){
      console.log('读取文件失败了',err);
  }
  )
