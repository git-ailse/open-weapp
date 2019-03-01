const axios = require('axios')
const API = require('./wxapp_open')

module.exports = async (appid, openid, msgType, content, obj) => {
    let authorizer_access_token = await API.getAuthorizerAccessToken(appid)
    let opt
    if (msgType == 'text') {
        console.log('text')
        opt = {
            touser: openid,
            msgtype: 'text',
            text: {
                content: content
            }
        }
    } else {
        opt = {
            touser: openid,
            msgtype: msgType,
        }
        opt[msgType] = obj
    }
    console.log('opt', opt)
    let result = await axios.post('https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=' + authorizer_access_token, opt)
    return result.data
}