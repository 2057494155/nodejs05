var fs = require('fs')

function pReadFile (FilePath) {
   return new Promise(function (resolve, reject) {
    fs.readFile('./data/a.txt', 'utf8', function (err, data) {
      if (err) {
        reject(err)
      }else {
        resolve(data)
      }
    })
  })
}

 pReadFile('./data/a.txt')
  .then(function(data){
      console.log(data);
      return readFile('./data/b.txt')
  })
  .then(function(data){
      console.log(data);
      return readFile('./data/c.txt')
  })
  .then(function(data){
    console.log(data);
  })
  