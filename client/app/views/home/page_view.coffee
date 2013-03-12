NavView = require '../ui/nav_view'
LoginView = require './login_view'
Model = require '../../models/login'
config = require '/config/config'

module.exports = class HomePageView extends Backbone.View

  events:
    "click #login-btn": "login"
    "click #captcha": 'getCaptcha'

  template: require './templates/page'

  initialize: =>
    @getCaptcha()
    @render()

  render: =>
    @$el.html @template()
    # navView = new NavView
    loginView = new LoginView
    @$el.prepend loginView.$el
    # @$el.prepend navView.$el
    @$('.tip').tooltip()
    this;

  getCaptcha: =>
    $("#captcha").attr "src", "/images/spinner.gif"
    $.get(config.api.baseUrl + '/captcha', (res) =>
      if(res == 1)
        @$("#captcha").attr "src", config.api.baseUrl + '/captcha/captcha.jpg'
      else if(res == 2)
        bootbox.alert '您已经登入了...现在跳转到查询页，如果操作失败，请尝试退出并重新登入'
        router.navigate 'query', trigger: true
      else
        bootbox.alert '获取验证码失败... I\'ll fix it with thousands of process!'
    )

  login: =>
    model = new Model @$("#login-form").toObject()

    saveOpt =
      error: (model, xhr) =>
        resCode = xhr.status;
        res = xhr.responseText
        if resCode is 200
          return bootbox.alert '登入失败:( 请求错误代码 ' + resCode + ' 可能是服务器问题，请查看服务端是否正常运行'

      success: (model, res)=>
        if(res.status is "0" || res.status is 0)
          @getCaptcha()
          return bootbox.alert '登入失败, 请检查账号密码, 若连续错误3次将...有不可预知的结果发生'
        
        # if login succeess
        bootbox.alert res.username + ' 登入成功~ XD'
        router.navigate '/query', trigger: true

    model.save({}, saveOpt);
