node12306
=========

## This project is dedicated to

###Young Chier([@铅笔橡皮头儿](http://weibo.com/youngchier))
> Now is always better than later, later is always better than never.

## Description:
 这是一个12306的客户端，旨在帮12306提升用户体验以及提高购票成功率。

 采用[`express`](http://http://expressjs.com/)来做API，前端用[`Brunch`](http://brunch.io)。使用shell script来安装。

~~Client part of this project,客户端部分: [Node12306-Client](https://github.com/dotSlashLu/node12306-client), also hosted on [Bitbucket](https://bitbucket.org/lutashi/node12306-client)~~ Now client part has been integrated into this project in `/client`

 Detailed used open source projects & libraries will be listed below.

## Features:
1.  比12306漂亮不知道多少倍的用户界面
2.  自定义并发process数量（票不难抢的时候也可以做一般客户端）
3.  基于浏览器，可以直接付款
4.  API基于node， phantom，高并发且不会被识别出非正常访问
5.  使用脚本自动安装

## Router Scheme:
*	GET '/'	=>	client homepage
*	…

(Please reference `router.js` before I have time writing this sec)
...

## For freshmen on NODE
* cd to `path/to/node12306`
* run `npm install`
* run `node .`

## 12306.cn to Node12306 mapping
1.Get captcha and cookies
2.login
3.query
4.confirm order
5.check order
6.queue

## License:
MIT
