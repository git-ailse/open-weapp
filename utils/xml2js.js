const xml2js = require('xml2js')
const parser = new xml2js.Parser()
const crypto = require('crypto')
const plat = require('../config/constant')

module.exports = (ctx, next) => {
    return new Promise((resolve, reject) => {
        if (ctx.is('text/xml')) {
            ctx.req.on('data', (data) => {
                parser.parseString(data, (err, result) => {
                    let decipher, plain_text
                    let key = new Buffer(plat.key + '=', 'base64')
                    decipher = crypto.Decipheriv('aes-256-cbc', key, key.slice(0, 16))
                    // 使用BASE64对密文进行解码，然后AES-CBC解密
                    decipher.setAutoPadding(false)
                    plain_text = decipher.update(result.xml.Encrypt[0], 'base64', 'utf8') + decipher.final('utf8')
                    var pad = plain_text.charCodeAt(plain_text.length - 1)
                    plain_text = plain_text.slice(20, -pad - 18)
                    parser.parseString(plain_text, (err, results) => {
                        resolve(results.xml)
                    })
                })
            })
        } else resolve(1)
    }).then((data) => {
        if (data != 1) ctx.xml = data
        next()
    })
}