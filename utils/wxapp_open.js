// const wxapp_open = require('wxapp_open')
const wxapp_open = require('./index')
const component = require('../config/constant')
module.exports = new wxapp_open(component.appid, component.appsecret, component.key, { host: '127.0.0.1', port: 6379 })