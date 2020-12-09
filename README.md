# output_tgz_npm

下载 tgz 格式 npm 源，转到私有服务器上

##### 打开 cmd 进入当前目录(需要安装 nodejs 环境)

直接把项目中 package.json 文件拷入 init_serve.json 文件，如果单独下载传入数组格式

```
[
 "qs",
 "axios",
 "vuex",
 "typescript"
]
```

​ 运行 npm i；（下载项目依赖包）

​ 运行 node init.js (执行 init 文件)

等待打出“下载完成”即可

​ 日志和文件输出在 output 文件夹

​ AA-log.txt 为下载失败文件；

重新执行，如果再失败需要手动下载
​ 需要手动使用 npm pack 包名 进行下载 （不加版本号）

vue 和 vue-template-compiler 的版本必须一致（这里统一为 @2.6.12）
