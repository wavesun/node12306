node12306
=========

## This project is dedicated to

###Young Chier([@铅笔橡皮头儿](http://weibo.com/youngchier))
> Now is always better than later, later is always better than never.

## Description:
 这是一个12306的客户端，旨在帮12306提升用户体验以及提高购票成功率。

 采用[`express`](http://http://expressjs.com/)来做API，前端用[`Brunch`](http://brunch.io)。使用shell script来安装。

 Client part of this project: [Node12306-Client](https://github.com/dotSlashLu/node12306-client), also hosted on [Bitbucket](https://bitbucket.org/lutashi/node12306-client)

 Detailed used open source projects & libraries will be listed below.

## Features:
1.  比12306漂亮不知道多少倍的用户界面
2.  自定义并发process数量（票不难抢的时候也可以做一般客户端）
3.  基于浏览器，可以直接付款
4.  API基于node， phantom，高并发且不会被识别出非正常访问
5.  使用脚本自动安装

## Router Scheme:
(Please reference `router.js` before I have time writing this sec)
...

## For freshmen on NODE
* cd to `path/to/node12306`
* run `npm install`
* run `node .`

## Todo:
2013年 1月20日 星期日 18时40分21秒 CST

  5天搞定API，2天搞定Client，争取在大家订返程票的时候帮到大家！


2013年 1月21日 星期一 00时20分53秒 CST
    
  需求：
  * 登陆

  * 查询

  * 选择

  * ~~无需确认，选错自己去取消订单~~
  
  * 提交
    

2013年 1月21日 星期一 05时28分25秒 CST

  * 做好登陆API(关键是cookie部分)，验证cookie可重用性。


:r! date(请yy这是一个时间戳谢谢)

  > 今日做好登陆。


2013年 1月24日 星期四 00时21分40秒 CST

  > 登陆~~按时~~完成，今日完成查询和多进程.

## License:
MIT
