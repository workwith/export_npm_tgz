let fs = require("fs");
let shell = require("shelljs");

fs.mkdir("output", (error) => {
  if (error) {
    console.log("创建文件失败");
    return false;
  }
  // 结果输出目录
  let outputDir = "output";
  // 所有npm包名
  let pack = require("./init_serve.json");
  shell.cd(outputDir);
  let errArr = [];
  pack.forEach((item, index) => {
    shell.exec(`npm pack ${item}`, function (err) {
      if (err) {
        errArr.push(item);
        fs.writeFileSync("AA-log.txt", JSON.stringify(errArr));
      }
      if (errArr.length) {
        console.log(`有${errArr.length}个错误下载,请查看错误记录`);
      }
      if (index == pack.length - 1) {
        console.log("==============下载完成======================");
      }
    });
  });
});
