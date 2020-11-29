# output_tgz_npm
下载tgz格式npm源，转到私有服务器上

##### 打开cmd进入当前目录(需要安装nodejs环境)

​	运行 npm i；（下载项目依赖包）

​	运行 node init.js  (执行init文件)

等待打出“下载完成”即可

​	日志和文件输出在output文件夹

​		AA-log.txt为下载失败文件；

​		需要手动使用   npm pack 包名   进行下载 （不加版本号）



vue 和vue-template-compiler的版本必须一致（这里统一为 @2.6.12）
