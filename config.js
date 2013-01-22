module.exports = {
  web:{
    port: 3000,
  },

  phantom:{
   login:{
     url: "https://dynamic.12306.cn/otsweb/",
     //url: "https://google.com",
     captchaSelector: ".yz_r img",  
     captchaSelectorCtx: '$("#main").contents()',
     captchaSelectorIndex: "",
     captchaPath: "public/captcha"
    },

    cookiePath: "public/cookies",

  },
}
