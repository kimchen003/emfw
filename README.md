##开始使用emfw脚手架
###安装
全局安装emfw `npm install -g emfw`
###使用
按住shift + 右键选择文件夹 + 选择"在此处打开命令窗口"<br/>
输入指令:<br/>
创建新项目               `emfw create`<br/>
添加页面(可多个)         `emfw add [pageName]+`<br/>
删除页面(可多个)         `emfw del [pageName]+`<br/>
模块版本号               `emfw -v`<br/>
帮助                     `emfw -h`<br/>
###项目打包及在线编译
安装模块依赖 `npm install`<br/>
编译less `grunt less`<br/>
在线编译 `grunt watch`<br/>
合并压缩 `grunt`<br/>
###提示
网络太慢建议使用淘宝镜像 `cnpm install`<br/>
安装 : `npm install -g cnpm --registry=https://registry.npm.taobao.org`


吊起天天基金APP方法
===================

##引用方法

直接在html中引用

```html
<!--正常版本-->
<script src="https://img.1234567.com.cn/counter.min.js"></script>
<!--没有自定义方法-->
<script src="https://img.1234567.com.cn/com/counter/1.0.1/counter.min.js"></script>
<!--有自定义方法-->
<script src="https://img.1234567.com.cn/com/counter/1.0.2/counter.min.js"></script>
```

##吊起方法

在想要点击吊起APP的DOM元素上面加上 data-actionType 自定义属性

* 吊起APP后去到指定专题页，需提供**adid**
```html
data-actionType="0|adid"
```
* 吊起APP后去到指定资讯页，需提供**newsid**
```html
data-actionType="1|newsid"
```
* 吊起APP后去到指定品种页，需提供**fundcode**
```html
data-actionType="2|fundcode"
```
* 吊起APP后去到指定购买页，需提供**fundcode**
```html
data-actionType="3|fundcode"
```
* 吊起APP后去到指定H5页面，需提供H5页面的id，及相应的参数（非必要）
```html
data-actionType="5|id[|param]"
<!--模拟组合详情页，需要fpid-->
data-actionType="5|1|fpid"
<!--组合宝详情页，需要id-->
data-actionType="5|2|id"
<!--基金公司，需要id-->
data-actionType="5|3|id"
<!--主题基金，需要id-->
data-actionType="5|4|id"
<!--基金经理详情，需要managerid-->
data-actionType="5|5|managerid"
<!--基金诊断，需要id-->
data-actionType="5|6|id"
<!--高端理财详情页，需要id-->
data-actionType="5|7|id"
<!--定期宝-->
data-actionType="5|8"
<!--基金吧某吧，需要postid-->
data-actionType="5|9|postid"
<!--基金吧帖子，需要aid-->
data-actionType="5|10|aid"
<!--规模份额页-净资产变动，需要id-->
data-actionType="5|11|id"
<!--投资组合页-持仓明细(非货币)，需要id-->
data-actionType="5|12|id"
<!--投资组合页-资产配置(货币)，需要id-->
data-actionType="5|13|id"
<!--分红配送页，需要id-->
data-actionType="5|14|id"
<!--基金公告页，需要id-->
data-actionType="5|15|id"
<!--基金评级页，需要id-->
data-actionType="5|16|id"
<!--基金净值页，需要id-->
data-actionType="5|17|id"
<!--基金经理，需要id-->
data-actionType="5|18|id"
<!--基金话题，需要hotid-->
data-actionType="5|19|hotid"
<!--基金吧首页-->
data-actionType="5|20"
<!--财富号，需要accountId-->
data-actionType="5|21|accountId"
<!--工行信用卡项目-->
data-actionType="5|22"
<!--工行信用卡项目结果页-->
data-actionType="5|23"
<!--猜指数页面-->
data-actionType="5|24"
```


## 兼容性
2018-01-24 测试数据
#### IOS
手机型号 | 系统 | 微信 | safari | QQ | UC | 无app的safari |
---- | ----- | :---: | :---: | :---: | :---: | :---:
Iphone 6 | 10.3.2 | 下载页 | √ | 下载页 | 下载页 | 下载页
Iphone 6S | 10.0.2 | 下载页 | √ | 下载页 | 下载页 | 下载页
Iphone X | 10.0.2 | 下载页 | √ | 下载页 | -- | 下载页
Iphone 5S | 8.4.1 | 提示打开浏览器 | √ | √ | √ | 提示弹框然后下载页
#### Android
安卓浏览器会提示是否需要打开APP
手机型号 | 系统 | 微信 | 浏览器 | QQ | UC | 无app的浏览器 |
---- | ----- | :---: | :---: | :---: | :---: | :---:



## 附言
ios9+版本使用通用短链实现唤起功能
从其他域名点击后跳转以下链接会直接唤起app
m.1234567.com.cn
unitmob.1234567.com.cn/u
j.dfcfw2.com/5027
