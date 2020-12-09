let fs = require("fs");
let shell = require("shelljs");
let path = require('path');
let type;

try{
  fs.statSync(path.join(__dirname, 'output'));
  //如果可以执行到这里那么就表示存在了
  type = true;
}catch(e){
  //捕获异常
  type = false;
}

fs.mkdir("output", (error) => {
  console.log(error);
  if (error && !type) {
    console.log("创建文件失败");
    return false;
  }
  // 结果输出目录
  let outputDir =path.resolve(__dirname,'output');
  // 所有npm包名
  let pack = require("./init_serve.json");
  // let pack = require("./init_serve2.json");
  shell.cd(outputDir);
  let errArr = []; //下载错误包
  // 判断是否是数组
  if (Array.isArray(pack)) {
    pack.forEach((item, index) => {
      shell.exec(`npm pack ${item}`, function (err) {
        if (err) {
          errArr.push(item);
          fs.writeFileSync("AA-log.txt", JSON.stringify(errArr));
        }
        // if (errArr.length) {
        //   console.log(`有${errArr.length}个错误下载,请查看错误记录`);
        // }
        // if (index == pack.length - 1) {
        //   console.log("==============下载完成======================");
        // }
      });
    });
  } else {
    let dependencies = pack.dependencies;
    let devDependencies = pack.devDependencies;
    if (dependencies) {
      for (let key in dependencies) {
        // console.log(key + "---" + pack[key]);
        // console.log(pack[key].indexOf("^"));
        if (
          dependencies[key].indexOf("^") != -1 ||
          dependencies[key].indexOf("~") != -1
        ) {
          let newstr = dependencies[key].slice(1);
          updown(key, newstr, errArr);
        } else {
          let newstr = dependencies[key];
          updown(key, newstr, errArr);
        }
      }
    }
    if (devDependencies) {
      for (let key in devDependencies) {
        // console.log(key + "---" + pack[key]);
        // console.log(pack[key].indexOf("^"));
        if (
          devDependencies[key].indexOf("^") != -1 ||
          devDependencies[key].indexOf("~") != -1
        ) {
          let newstr = devDependencies[key].slice(1);
          updown(key, newstr, errArr);
        } else {
          let newstr = devDependencies[key];
          updown(key, newstr, errArr);
        }
      }
    }
  }
  if (errArr.length) {
    console.log(`有${errArr.length}个错误下载,请查看错误记录`);
  }
});

function updown(key, newstr, errArr) {
  shell.exec(`npm pack ${key}@${newstr}`, function (err) {
    if (err) {
      errArr.push(key);
      fs.writeFileSync("AA-log.txt", JSON.stringify(errArr));
    }
  });
}
