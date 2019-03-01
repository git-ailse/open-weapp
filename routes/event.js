const router = require('koa-router')()
const xml = require('../utils/xml2js')
const querystring = require('querystring')
const API = require('../utils/wxapp_open')
router.post('/', xml, async (ctx, next) => {
  let msg_signature = querystring.parse(ctx.querystring).msg_signature
  let timetamp = querystring.parse(ctx.querystring).timestamp
  let nonce = querystring.parse(ctx.querystring).nonce
  console.log('msg_signature', msg_signature)
  console.log('timetamp', timetamp)
  console.log('nonce', nonce)
  console.log('data1', ctx.xml)
  if (ctx.xml.ComponentVerifyTicket) {
    //第三方平台ComponentVerifyTicket推送，每10分钟1次
    API.setComponentVerifyTicket(ctx.xml.ComponentVerifyTicket[0])
    ctx.body = 'success'
  }
})

module.exports = router
