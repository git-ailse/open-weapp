const router = require('koa-router')()
const plat = require('../config/constant')
const querystring = require("querystring")
const API = require('../utils/wxapp_open')

//公众号授权页
router.get('/', async (ctx, next) => {
    console.log('auth')
    //取pre_auth_code
    let pre_auth_code = await API.getPreAuthCode()
    console.log('pre_auth_code', pre_auth_code)

    //如果没有回调参数，渲染页面，点击跳转微信授权扫描二维码
    await ctx.render('auth', {
        url: 'https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid=' + plat.appid + '&pre_auth_code=' + pre_auth_code + '&redirect_uri=' + plat.url + '/auth/callback',
        mobileUrl: `https://mp.weixin.qq.com/safe/bindcomponent?action=bindcomponent&auth_type=3&no_scan=1&component_appid=${plat.appid}&pre_auth_code=${pre_auth_code}&redirect_uri=${plat.url}&auth_type=3#wechat_redirect`
    })
})

//公众号授权回调
router.get('/callback', async (ctx, next) => {
    let auth_code = querystring.parse(ctx.querystring).auth_code
    let res = await API.auth(auth_code)
    console.log('res', res);
    ctx.body = 'success'
})

module.exports = router