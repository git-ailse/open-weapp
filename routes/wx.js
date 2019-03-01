const router = require('koa-router')()
const xml = require('../utils/xml2js')
const axios = require('axios')
const sendMsg = require('../utils/sendMsg')
const encrypt = require('../utils/encrypt')
const plat = require('../config/constant')
const API = require('../utils/wxapp_open')


router.post('/:appid', xml, (ctx, next) => {
    return new Promise(async (resolve, reject) => {
        let appid = ctx.params.appid
        console.log('appid', appid)
        console.log('data1', ctx.xml)
        let msg, opt
        //全网发布测试
        if (appid == 'wx570bc396a51b8ff8') {
            //推送事件
            if (ctx.xml.MsgType[0] == 'event') {
                console.log('Event', ctx.xml.Event[0])
                opt = {
                    ToUserName: ctx.xml.FromUserName[0],
                    FromUserName: ctx.xml.ToUserName[0],
                    CreateTime: parseInt(new Date().getTime() / 1000),
                    MsgType: 'text',
                    Content: ctx.xml.Event[0] + 'from_callback'
                }
                msg = encrypt(opt)
                resolve(msg)
            } else if (ctx.xml.Content[0] == 'TESTCOMPONENT_MSG_TYPE_TEXT') {
                opt = {
                    ToUserName: ctx.xml.FromUserName[0],
                    FromUserName: ctx.xml.ToUserName[0],
                    CreateTime: new Date().getTime() / 1000,
                    MsgType: 'text',
                    Content: 'TESTCOMPONENT_MSG_TYPE_TEXT_callback'
                }
                msg = encrypt(opt)
                resolve(msg)
            } else if (ctx.xml.Content[0].indexOf('QUERY_AUTH_CODE') > -1) {
                resolve('success')
                let component_access_token = await API.getComponentAccessToken()
                let index = ctx.xml.Content[0].indexOf(':')
                let auth_code = ctx.xml.Content[0].substring(index + 1)
                console.log('auth_code', auth_code)
                let result = await axios.post('https://api.weixin.qq.com/cgi-bin/component/api_query_auth?component_access_token=' + component_access_token, {
                    'component_appid': plat.appid,
                    'authorization_code': auth_code
                })
                console.log('result', result.data)
                sendMsg(appid, ctx.xml.FromUserName[0], 'text', auth_code + '_from_api', null)
            } 
        } 
    }).then((data) => {
        ctx.body = data
    })
})

module.exports = router