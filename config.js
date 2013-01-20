module.exports = {
  web:{
    port: 3000,
  },

  phantom:{
   login:{
     url: "http://www.douban.com/accounts/register",
     captchaSelector: ".captcha-item img",  
     captchaPath: "public/captcha"
    },  
  },
}
