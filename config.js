module.exports = {
  web:{
    port: 3000,
  },
  
  helpers: __dirname+'/helpers/',

  login:{
    url: "https://dynamic.12306.cn/otsweb/",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17",
    captchaHost: "dynamic.12306.cn",
    captchaPath: "/otsweb/passCodeAction.do?rand=sjrand&",//don't forget the rand~
    captchaSavePath: "public/captcha",

    randHost: 'dynamic.12306.cn',
    randPath: '/otsweb/loginAction.do?method=loginAysnSuggest',

    formHost: 'dynamic.12306.cn',
    formPath: '/otsweb/loginAction.do?method=login'
  },

  cookiePath: "public/cookies",
  
  headersBase: {
    "Accept": "application/json, text/javascript, */*",
    "Accept-Charset": "UTF-8,*;q=0.5",
    "Accept-Language": "zh-CN,zh;q=0.8",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Host": "dynamic.12306.cn",
    "Origin": "https://dynamic.12306.cn",
    "Pragma": "no-cache",
    "Referer": "https://dynamic.12306.cn/otsweb/order/confirmPassengerAction.do?method=init",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17",
  }
}
