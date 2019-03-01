const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const router = require('koa-router')()

const event = require('./routes/event')
const api = require('./routes/api')
const auth = require('./routes/auth')
const wx = require('./routes/wx')

// error handler
// onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
router.get('/', (ctx, next) => {
  ctx.body = '欢迎调用微信开放平台api接口！'
})
router.use('/event', event.routes(), event.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())
router.use('/auth', auth.routes(), auth.allowedMethods())
router.use('/wx', wx.routes(), wx.allowedMethods())


app.use(router.routes(), router.allowedMethods())

module.exports = app
