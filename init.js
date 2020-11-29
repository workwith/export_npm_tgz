let fs = require('fs')
let path = require('path')
let shell = require("shelljs")

// 结果输出目录
let outputDir = 'output'

// 所有npm包名
let pack = require("./init_serve.json")
shell.cd(outputDir)
let errArr = []
pack.forEach((item, index) => {
  shell.exec(`npm pack ${item}`, function (err) {
    if (err) {
      errArr.push(item)
      fs.writeFileSync("AA-log.txt", JSON.stringify(errArr))
      if (index == pack.length - 1) {
        console.log('下载完成')
      }
    }
  })
})

