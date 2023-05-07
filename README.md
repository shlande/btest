# 西电B测雾霾检测

React + Typescript 完成，需要使用node环境，自己配好。

所有API都来自[和风天气](https://dev.qweather.com/docs)

## 如何使用

clone 本仓库到本地
```shell
git clone https://github.com/shlande/btest.git
```
注册账号并生成APIKEY，在`btest`目录下创建`.env`文件
```text
# .env
VITE_QWKEY=<PUT YOUR KEY HERE>
```
安装依赖并运行
```shell
pnpm install
pnpm run dev
```
