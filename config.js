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
    captchaSavePath: "public/captcha"
  },

  cookiePath: "public/cookies",
}
