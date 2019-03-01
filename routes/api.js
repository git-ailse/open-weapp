const router = require('koa-router')()
const API = require('../utils/wxapp_open')
const querystring = require("querystring")
const component = require('../config/constant')

/**
* 设置小程序服务器域名
* action   add添加, delete删除, set覆盖, get获取。当参数是get时不需要填四个域名字段
*/
router.post('/setDomain', async (ctx, next) => {
    let appId           = ctx.request.body.appId
    let action          = ctx.request.body.action
    let requestdomain   = ctx.request.body.requestdomain
    let wsrequestdomain = ctx.request.body.wsrequestdomain
    let uploaddomain    = ctx.request.body.uploaddomain
    let downloaddomain  = ctx.request.body.downloaddomain
    let res             = await API.setDomain(appId, action, requestdomain, wsrequestdomain, uploaddomain, downloaddomain)
    ctx.body = res
})

/**
* 设置小程序业务域名
* action   add添加, delete删除, set覆盖, get获取。当参数是get时不需要填四个域名字段
*/
router.post('/setWebviewDomain', async (ctx, next) => {
    let appId         = ctx.request.body.appId
    let action        = ctx.request.body.action
    let webviewdomain = ctx.request.body.webviewdomain
    let res           = await API.setWebviewDomain(appId, action, webviewdomain)
    ctx.body = res
})

/**
 * 绑定微信用户为小程序体验者
*/
router.post('/bindTester', async (ctx, next) => {
    let appId    = ctx.request.body.appId
    let wechatid = ctx.request.body.wechatid
    let res      = await API.bindTester(appId, wechatid)
    ctx.body = res
})

/**
 * 解除绑定小程序的体验者
*/
router.post('/unbindTester', async (ctx, next) => {
    let appId    = ctx.request.body.appId
    let wechatid = ctx.request.body.wechatid
    let res      = await API.unbindTester(appId, wechatid)
    ctx.body = res
})

/**
 * 获取体验者列表
*/
router.post('/getMemberList', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.getMemberList(appId)
    ctx.body = res
})

/**
 * 为授权的小程序帐号上传小程序代码
*/
router.post('/uploadCode', async (ctx, next) => {
    let appId        = ctx.request.body.appId
    let template_id  = ctx.request.body.template_id
    let ext_json     = ctx.request.body.ext_json
    let user_version = ctx.request.body.user_version
    let user_desc    = ctx.request.body.user_desc
    let res          = await API.uploadCode(appId, template_id, ext_json, user_version, user_desc)
    ctx.body = res
})

/**
 * 获取体验小程序的体验二维码
*/
router.post('/getQrcode', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let path  = ctx.request.body.path
    let res   = await API.getQrcode(appId, path)
    ctx.body = res
})

/**
 * 获取授权小程序帐号的可选类目
*/
router.post('/getCategory', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.getCategory(appId)
    ctx.body = res
})

/**
 * 获取小程序的第三方提交代码的页面配置（仅供第三方开发者代小程序调用）
*/
router.post('/getPage', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.getPage(appId)
    ctx.body = res
})

/**
 * 将第三方提交的代码包提交审核
*/
router.post('/submitAudit', async (ctx, next) => {
    let appId     = ctx.request.body.appId
    let item_list = ctx.request.body.item_list
    let res       = await API.submitAudit(appId, item_list)
    ctx.body = res
})

/**
 * 查询某个指定版本的审核状态（仅供第三方代小程序调用）
*/
router.post('/getAuditStatus', async (ctx, next) => {
    let appId   = ctx.request.body.appId
    let auditid = ctx.request.body.auditid
    let res     = await API.getAuditStatus(appId, auditid)
    ctx.body = res
})

/**
 * 查询最新一次提交的审核状态（仅供第三方代小程序调用）
*/
router.post('/getLatestAuditStatus', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.getLatestAuditStatus(appId)
    ctx.body = res
})

/**
 * 发布已通过审核的小程序（仅供第三方代小程序调用）
*/
router.post('/codeRelease', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.codeRelease(appId)
    ctx.body = res
})

/**
 * 修改小程序线上代码的可见状态（仅供第三方代小程序调用）
*/
router.post('/changeVisitStatus', async (ctx, next) => {
    let appId  = ctx.request.body.appId
    let action = ctx.request.body.action
    let res    = await API.changeVisitStatus(appId, action)
    ctx.body = res
})

/**
 * 小程序版本回退（仅供第三方代小程序调用）
*/
router.post('/revertCodeRelease', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.revertCodeRelease(appId)
    ctx.body = res
})

/**
 * 查询当前设置的最低基础库版本及各版本用户占比
*/
router.post('/getWeappSupportVersion', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.getWeappSupportVersion(appId)
    ctx.body = res
})

/**
 * 设置最低基础库版本（仅供第三方代小程序调用）
*/
router.post('/setWeappSupportVersion', async (ctx, next) => {
    let appId   = ctx.request.body.appId
    let version = ctx.request.body.version
    let res     = await API.setWeappSupportVersion(appId, version)
    ctx.body = res
})

/**
 * 设置小程序“扫普通链接二维码打开小程序”能力
 * 1) 增加或修改二维码规则
*/
router.post('/qrcodeJumpAdd', async (ctx, next) => {
    let appId           = ctx.request.body.appId
    let prefix          = ctx.request.body.prefix
    let permit_sub_rule = ctx.request.body.permit_sub_rule
    let path            = ctx.request.body.path
    let open_version    = ctx.request.body.open_version
    let debug_url       = ctx.request.body.debug_url
    let is_edit         = ctx.request.body.is_edit
    let res             = await API.qrcodeJumpAdd(appId, prefix, permit_sub_rule, path, open_version, debug_url, is_edit)
    ctx.body = res
})

/**
 * 设置小程序“扫普通链接二维码打开小程序”能力
 * 2) 获取已设置的二维码规则
*/
router.post('/qrcodeJumpGet', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.qrcodeJumpGet(appId)
    ctx.body = res
})

/**
 * 设置小程序“扫普通链接二维码打开小程序”能力
 *3)获取校验文件名称及内容
*/
router.post('/qrcodeJumpDownload', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.qrcodeJumpDownload(appId)
    ctx.body = res
})

/**
 * 设置小程序“扫普通链接二维码打开小程序”能力
 *4) 删除已设置的二维码规则
*/
router.post('/qrcodeJumpDelete', async (ctx, next) => {
    let appId  = ctx.request.body.appId
    let prefix = ctx.request.body.prefix
    let res    = await API.qrcodeJumpDelete(appId, prefix)
    ctx.body = res
})

/**
 * 设置小程序“扫普通链接二维码打开小程序”能力
 *5) 发布已设置的二维码规则
*/
router.post('/qrcodeJumpPublish', async (ctx, next) => {
    let appId  = ctx.request.body.appId
    let prefix = ctx.request.body.prefix
    let res    = await API.qrcodeJumpPublish(appId, prefix)
    ctx.body = res
})

/**
 * 小程序审核撤回
*/
router.post('/undoCodeAudit', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.undoCodeAudit(appId)
    ctx.body = res
})

/**
 * 小程序分阶段发布
 * 1）分阶段发布接口
 *
*/
router.post('/grayRelease', async (ctx, next) => {
    let appId           = ctx.request.body.appId
    let gray_percentage = ctx.request.body.gray_percentage
    let res             = await API.grayRelease(appId, gray_percentage)
    ctx.body = res
})

/**
 * 小程序分阶段发布
 * 2）取消分阶段发布
 *
*/
router.post('/revertGrayRelease', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res = await API.revertGrayRelease(appId)
    ctx.body = res
})

/**
 * 小程序分阶段发布
 * 3）查询当前分阶段发布详情
 *
*/
router.post('/getGrayReleasePlan', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.getGrayReleasePlan(appId)
    ctx.body = res
})

/**
 * 获取草稿箱内的所有临时代码草稿
 *
*/
router.post('/getCodeTemplateDraftList', async (ctx, next) => {
    let res = await API.getCodeTemplateDraftList()
    ctx.body = res
})

/**
 * 获取代码模版库中的所有小程序代码模版
*/
router.post('/getCodeTemplateList', async (ctx, next) => {
    let res = await API.getCodeTemplateList()
    ctx.body = res
})

/**
 * 将草稿箱的草稿选为小程序代码模版
*/
router.post('/addCodeTemplate', async (ctx, next) => {
    let draft_id = ctx.request.body.draft_id
    let res      = await API.addCodeTemplate(draft_id)
    ctx.body = res
})

/**
 * 删除指定小程序代码模版
*/
router.post('/deleteCodeTemplate', async (ctx, next) => {
    let template_id = ctx.request.body.template_id
    let res = await API.deleteCodeTemplate(template_id)
    ctx.body = res
})

/**
 * 微信登录
 * code 换取 session_key
*/
router.post('/login', async (ctx, next) => {
    let appId   = ctx.request.body.appId
    let js_code = ctx.request.body.js_code
    let res     = await API.login(appId, js_code)
    ctx.body = res
})


/**
 * 微信小程序getUserInfo数据解密
 * encryptedData 用户敏感数据解密
*/
router.post('/decryptData', async (ctx, next) => {
    let appId         = ctx.request.body.appId
    let sessionKey    = ctx.request.body.sessionKey
    let encryptedData = ctx.request.body.encryptedData
    let iv            = ctx.request.body.iv
    let res = await API.decryptData(appId, sessionKey, encryptedData, iv)
    ctx.body = res
})

/**
 * 小程序模板设置
 * 1.获取小程序模板库标题列表
*/
router.post('/getTemplateLibraryList', async (ctx, next) => {
    let appId  = ctx.request.body.appId
    let offset = ctx.request.body.offset
    let count  = ctx.request.body.count
    let res    = await API.getTemplateLibraryList(appId, offset, count)
    ctx.body = res
})

/**
 * 小程序模板设置
 * 2.获取模板库某个模板标题下关键词库
*/
router.post('/getTemplateLibraryKey', async (ctx, next) => {
    let appId      = ctx.request.body.appId
    let templateId = ctx.request.body.templateId
    let res        = await API.getTemplateLibraryKey(appId, templateId)
    ctx.body = res
})

/**
 * 小程序模板设置
 * 3.组合模板并添加至帐号下的个人模板库
*/
router.post('/addTemplateLibrary', async (ctx, next) => {
    let appId           = ctx.request.body.appId
    let templateId      = ctx.request.body.templateId
    let keyword_id_list = ctx.request.body.keyword_id_list
    let res             = await API.addTemplateLibrary(appId, templateId, keyword_id_list)
    ctx.body = res
})

/**
 * 获取帐号下已存在的模板列表
*/
router.post('/getTemplateList', async (ctx, next) => {
    let appId  = ctx.request.body.appId
    let offset = ctx.request.body.offset
    let count  = ctx.request.body.count
    let res    = await API.getTemplateList(appId, offset, count)
    ctx.body   = res
})

/**
 * 删除帐号下的某个模板
*/
router.post('/delTemplate', async (ctx, next) => {
    let appId      = ctx.request.body.appId
    let templateId = ctx.request.body.templateId 
    let res        = await API.delTemplate(appId, templateId)
    ctx.body       = res
})

/**
 * 发送模版消息
*/
router.post('/sendTemplateMsg', async (ctx, next) => {
    let appId            = ctx.request.body.appId
    let openid           = ctx.request.body.openid
    let template_id      = ctx.request.body.template_id
    let form_id          = ctx.request.body.form_id
    let data             = ctx.request.body.data
    let page             = ctx.request.body.page
    let color            = ctx.request.body.color
    let emphasis_keyword = ctx.request.body.emphasis_keyword
    let res  = await API.sendTemplateMsg(appId, openid, template_id, form_id, data, page, color, emphasis_keyword)
    ctx.body = res
})

/**
 * 微信开放平台帐号管理
 * 1 、 创建 开放平台帐号并绑定公众号/小程序
*/
router.post('/createAccount', async (ctx, next) => {
    let appid = ctx.request.body.appid
    let res   = await API.createAccount(appid)
    ctx.body = res
})

/**
 * 微信开放平台帐号管理
 * 2 、将 公众号/小程序绑定到开放平台帐号下
*/
router.post('/bindAccount', async (ctx, next) => {
    let appid = ctx.request.body.appid
    let res   = await API.bindAccount(appid)
    ctx.body = res
})
/**
 * 微信开放平台帐号管理
 * 3、将公众号/小程序从开放平台帐号下解绑
*/
router.post('/unbindAccount', async (ctx, next) => {
    let appid = ctx.request.body.appid
    let res   = await API.unbindAccount(appid)
    ctx.body = res
})

/**
 * 微信开放平台帐号管理
 * 4、获取公众号/小程序所绑定的开放平台帐号
*/
router.post('/getAccount', async (ctx, next) => {
    let appid = ctx.request.body.appid
    let res   = await API.getAccount(appid)
    ctx.body = res
})

/**
 * 基础信息设置
 * 1. 设置小程序隐私设置（是否可被搜索）
*/
router.post('/setSearchStatus', async (ctx, next) => {
    let appId  = ctx.request.body.appId
    let status = ctx.request.body.status
    let res    = await API.setSearchStatus(appId, status)
    ctx.body = res
})

/**
 * 基础信息设置
 * 2. 查询小程序当前隐私设置（是否可被搜索）
*/
router.post('/getSearchStatus', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.getSearchStatus(appId)
    ctx.body = res
})

/**
 * 小程序插件管理权限集
*/
router.post('/plugin', async (ctx, next) => {
    let appId        = ctx.request.body.appId
    let action       = ctx.request.body.action
    let plugin_appid = ctx.request.body.plugin_appid
    let res          = await API.plugin(appId, action, plugin_appid)
    ctx.body = res
})

/**
 * 概况趋势
*/
router.post('/getweAnalySisAppidDailySummaryTrend', async (ctx, next) => {
    let appId      = ctx.request.body.appId
    let begin_date = ctx.request.body.begin_date
    let end_date   = ctx.request.body.end_date
    let res        = await API.getweAnalySisAppidDailySummaryTrend(appId, begin_date, end_date)
    ctx.body = res
})

/**
 * 访问分析 日趋势
*/
router.post('/getweAnalysisAppidDailyVisitTrend', async (ctx, next) => {
    let appId      = ctx.request.body.appId
    let begin_date = ctx.request.body.begin_date
    let end_date   = ctx.request.body.end_date
    let res        = await API.getweAnalysisAppidDailyVisitTrend(appId, begin_date, end_date)
    ctx.body = res
})

/**
 * 访问分析 周趋势
*/
router.post('/getweAnalysisAppidWeeklyVisitTrend', async (ctx, next) => {
    let appId      = ctx.request.body.appId
    let begin_date = ctx.request.body.begin_date
    let end_date   = ctx.request.body.end_date
    let res        = await API.getweAnalysisAppidWeeklyVisitTrend(appId, begin_date, end_date)
    ctx.body = res
})



/**
 * 访问分析 月趋势
*/
router.post('/getweAnalysisAppidMonthVisitTrend', async (ctx, next) => {
    let appId      = ctx.request.body.appId
    let begin_date = ctx.request.body.begin_date
    let end_date   = ctx.request.body.end_date
    let res        = await API.getweAnalysisAppidMonthVisitTrend(appId, begin_date, end_date)
    ctx.body = res
})

/**
 * 访问分布
*/
router.post('/getweAnalysisAppidVisitDistribution', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let begin_date = ctx.request.body.begin_date
    let end_date = ctx.request.body.end_date
    let res = await API.getweAnalysisAppidVisitDistribution(appId, begin_date, end_date)
    ctx.body = res
})

/**
 * 访问留存 日留存
*/
router.post('/getweAnalysisAppidDailyRetaininfo', async (ctx, next) => {
    let appId      = ctx.request.body.appId
    let begin_date = ctx.request.body.begin_date
    let end_date   = ctx.request.body.end_date
    let res        = await API.getweAnalysisAppidDailyRetaininfo(appId, begin_date, end_date)
    ctx.body = res
})


/**
 * 访问留存 周留存
*/
router.post('/getweAnalysisAppidWeeklyRetaininfo', async (ctx, next) => {
    let appId      = ctx.request.body.appId
    let begin_date = ctx.request.body.begin_date
    let end_date   = ctx.request.body.end_date
    let res        = await API.getweAnalysisAppidWeeklyRetaininfo(appId, begin_date, end_date)
    ctx.body = res
})

/**
 * 访问留存 月留存
*/
router.post('/getweAnalysisAppidMonthlyRetaininfo', async (ctx, next) => {
    let appId      = ctx.request.body.appId
    let begin_date = ctx.request.body.begin_date
    let end_date   = ctx.request.body.end_date
    let res        = await API.getweAnalysisAppidMonthlyRetaininfo(appId, begin_date, end_date)
    ctx.body = res
})

/**
 * 访问页面
*/
router.post('/getweAnalysisAppidVisitPage', async (ctx, next) => {
    let appId      = ctx.request.body.appId
    let begin_date = ctx.request.body.begin_date
    let end_date   = ctx.request.body.end_date
    let res        = await API.getweAnalysisAppidVisitPage(appId, begin_date, end_date)
    ctx.body = res
})

/**
 * 用户画像
*/
router.post('/getweAnalysisAppidUserportrait', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let begin_date = ctx.request.body.begin_date
    let end_date = ctx.request.body.end_date
    let res = await API.getweAnalysisAppidUserportrait(appId, begin_date, end_date)
    ctx.body = res
})

/**
 * 发送客服消息
 * 客服接口-发消息
*/
router.post('/sendCustomMessage', async (ctx, next) => {
    let appId      = ctx.request.body.appId
    let openid     = ctx.request.body.openid
    let msgtype    = ctx.request.body.msgtype
    let msgtypeObj = ctx.request.body.msgtypeObj
    let res        = await API.sendCustomMessage(appId, openid, msgtype, msgtypeObj)
    ctx.body = res
})

/**
 * 获取小程序码(适用于需要的码数量较少的业务场景, 永久有效，数量限制)
*/
router.post('/getWxaCode', async (ctx, next) => {
    let appId      = ctx.request.body.appId
    let path       = ctx.request.body.path
    let width      = ctx.request.body.width
    let auto_color = ctx.request.body.auto_color
    let line_color = ctx.request.body.line_color
    let is_hyaline = ctx.request.body.is_hyaline
    let res        = await API.getWxaCode(appId, path, width, auto_color, line_color, is_hyaline)
    ctx.body = res
})

/**
 * 获取小程序码(适用于需要的码数量极多的业务场景, 永久有效，数量暂无限制)
*/
router.post('/getWxaCodeUnLimit', async (ctx, next) => {
    let appId      = ctx.request.body.appId
    let scene      = ctx.request.body.scene
    let page       = ctx.request.body.page
    let width      = ctx.request.body.width
    let auto_color = ctx.request.body.auto_color
    let line_color = ctx.request.body.line_color
    let is_hyaline = ctx.request.body.is_hyaline
    let res        = await API.getWxaCodeUnLimit(appId, scene, page, width, auto_color, line_color, is_hyaline)
    ctx.body = res
})

/**
 * 获取小程序二维码(适用于需要的码数量较少的业务场景, 永久有效，数量限制)
*/
router.post('/createWxaQrcode', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let path  = ctx.request.body.path
    let width = ctx.request.body.width
    let res   = await API.createWxaQrcode(appId, path, width)
    ctx.body = res
})


/**
 *******************  *********代公众号实现业务*********  *******************
*/


/**
 * 获取openid
*/
router.get('/getOpenid', async (ctx, next) => {
    //获取url参数
    let URL   = decodeURIComponent(querystring.parse(ctx.querystring).callback)
    let wxid  = querystring.parse(ctx.querystring).wxid
    let code  = querystring.parse(ctx.querystring).code
    let appid = querystring.parse(ctx.querystring).appid
    let name  = querystring.parse(ctx.querystring).name
    if (code) {
        let openid = (await API.codeGetToken(appid, code)).openid
        if (URL.indexOf('?') > 0) {
            ctx.redirect(encodeURI(URL.replace('?', `?${name || 'openid'}=${openid}&`)))
        } else ctx.redirect(`URL?${name || 'openid'}=${openid}`)
    } else {
        //判断callback中是否有#，有的话进一步判断#之前是否有？查询字符串
        if ((URL.indexOf('#') > 0) && ((URL.indexOf('?') > URL.indexOf('#')) || URL.indexOf('?') == -1)) {
            URL = URL.replace('#', '?str=1#')
        }
        name = name ? `&name=${name}` : ''
        let url = encodeURIComponent(`${component.url}/api/getOpenid?callback=${encodeURIComponent(URL)}${name}`)
        ctx.redirect(API.getCode(wxid, url))
    }
})

/**
 * 获取用户基本信息（包括UnionID机制）
*/
router.post('/getUserInfo', async (ctx, next) => {
    let appId  = ctx.request.body.appId
    let openid = ctx.request.body.openid
    let res    = await API.getUserInfo(appId, openid)
    ctx.body = res
})

/**
 * 批量获取用户基本信息
*/
router.post('/getUserInfoList', async (ctx, next) => {
    let appId     = ctx.request.body.appId
    let user_list = ctx.request.body.user_list
    let res       = await API.getUserInfoList(appId, user_list)
    ctx.body = res
})

/**
 * 批量获取用户基本信息
*/
router.post('/getOpenidList', async (ctx, next) => {
    let appId       = ctx.request.body.appId
    let next_openid = ctx.request.body.next_openid
    let res         = await API.getOpenidList(appId, next_openid)
    ctx.body = res
})

/**
 * 创建标签
*/
router.post('/createTag', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let name = ctx.request.body.name
    let res = await API.createTag(appId, name)
    ctx.body = res
})

/**
 * 获取公众号已创建的标签
*/
router.post('/getTags', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let name  = ctx.request.body.name
    let res   = await API.getTags(appId, name)
    ctx.body = res
})

/**
 * 编辑标签
*/
router.post('/updateTag', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let id    = ctx.request.body.id
    let name  = ctx.request.body.name
    let res   = await API.updateTag(appId, id, name)
    ctx.body = res
})

/**
 * 删除标签
*/
router.post('/deleteTag', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let id    = ctx.request.body.id
    let res   = await API.deleteTag(appId, id)
    ctx.body = res
})

/**
 * 获取标签下粉丝列表
*/
router.post('/getTagUserList', async (ctx, next) => {
    let appId       = ctx.request.body.appId
    let tagid       = ctx.request.body.tagid
    let next_openid = ctx.request.body.next_openid
    let res         = await API.getTagUserList(appId, tagid, next_openid)
    ctx.body = res
})

/**
 * 批量为用户打标签
*/
router.post('/batchTags', async (ctx, next) => {
    let appId       = ctx.request.body.appId
    let tagid       = ctx.request.body.tagid
    let next_openid = ctx.request.body.next_openid
    let res         = await API.batchTags(appId, tagid, next_openid)
    ctx.body = res
})

/**
 * 批量为用户取消标签
*/
router.post('/batchUnTag', async (ctx, next) => {
    let appId       = ctx.request.body.appId
    let tagid       = ctx.request.body.tagid
    let next_openid = ctx.request.body.next_openid
    let res         = await API.batchUnTag(appId, tagid, next_openid)
    ctx.body = res
})

/**
 * 获取用户身上的标签列表
*/
router.post('/getUserTags', async (ctx, next) => {
    let appId  = ctx.request.body.appId
    let openid = ctx.request.body.openid
    let res    = await API.getUserTags(appId, openid)
    ctx.body = res
})

/**
 * 设置用户备注名
*/
router.post('/updateRemark', async (ctx, next) => {
    let appId  = ctx.request.body.appId
    let openid = ctx.request.body.openid
    let remark = ctx.request.body.remark
    let res    = await API.updateRemark(appId, openid, remark)
    ctx.body = res
})

/**
 * 获取公众号的黑名单列表
*/
router.post('/getBlackList', async (ctx, next) => {
    let appId        = ctx.request.body.appId
    let begin_openid = ctx.request.body.begin_openid
    let res          = await API.getBlackList(appId, begin_openid)
    ctx.body = res
})

/**
 * 拉黑用户
*/
router.post('/batchBlackList', async (ctx, next) => {
    let appId       = ctx.request.body.appId
    let openid_list = ctx.request.body.openid_list
    let res         = await API.batchBlackList(appId, openid_list)
    ctx.body = res
})

/**
 * 取消拉黑用户
*/
router.post('/batchUnBlackList', async (ctx, next) => {
    let appId       = ctx.request.body.appId
    let openid_list = ctx.request.body.openid_list
    let res         = await API.batchUnBlackList(appId, openid_list)
    ctx.body = res
})

/**
 * 自定义菜单创建接口
*/
router.post('/createMenu', async (ctx, next) => {
    let appId  = ctx.request.body.appId
    let button = ctx.request.body.button
    let res    = await API.createMenu(appId, button)
    ctx.body = res
})

/**
 * 自定义菜单查询接口(可以获取默认菜单和全部个性化菜单信息)
*/
router.post('/getMenu', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.getMenu(appId)
    ctx.body = res
})

/**
 * 自定义菜单删除接口(调用此接口会删除默认菜单及全部个性化菜单)
*/
router.post('/deleteMenu', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.deleteMenu(appId)
    ctx.body = res
})

/**
 * 创建个性化菜单
*/
router.post('/createConditionalMenu', async (ctx, next) => {
    let appId     = ctx.request.body.appId
    let button    = ctx.request.body.button
    let matchrule = ctx.request.body.matchrule
    let res       = await API.createConditionalMenu(appId, button, matchrule)
    ctx.body = res
})

/**
 * 删除个性化菜单
*/
router.post('/deleteConditionalMenu', async (ctx, next) => {
    let appId  = ctx.request.body.appId
    let menuid = ctx.request.body.menuid
    let res    = await API.deleteConditionalMenu(appId, menuid)
    ctx.body = res
})

/**
 * 测试个性化菜单匹配结果
*/
router.post('/tryMatchConditionalMenu', async (ctx, next) => {
    let appId   = ctx.request.body.appId
    let user_id = ctx.request.body.user_id
    let res     = await API.tryMatchConditionalMenu(appId, user_id)
    ctx.body = res
})

/**
 * 获取自定义菜单配置接口
*/
router.post('/getCurrentSelfMenu', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.getCurrentSelfMenu(appId)
    ctx.body = res
})

/**
 * 发送模板消息
*/
router.post('/sendTemplateMessage', async (ctx, next) => {
    let appId       = ctx.request.body.appId
    let openid      = ctx.request.body.openid
    let template_id = ctx.request.body.template_id
    let url         = ctx.request.body.url
    let data        = ctx.request.body.data
    let miniprogram = ctx.request.body.miniprogram
    let res         = await API.sendTemplateMessage(appId, openid, template_id, url, data, miniprogram)
    ctx.body = res
})

/**
 * 设置所属行业
*/
router.post('/setIndustry', async (ctx, next) => {
    let appId        = ctx.request.body.appId
    let industry_id1 = ctx.request.body.industry_id1
    let industry_id2 = ctx.request.body.industry_id2
    let res          = await API.setIndustry(appId, industry_id1, industry_id2)
    ctx.body = res
})

/**
 * 获取设置的行业信息
*/
router.post('/getIndustry', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.getIndustry(appId)
    ctx.body = res
})

/**
 * 获得消息模板ID(添加消息模板)
*/
router.post('/addTemplate', async (ctx, next) => {
    let appId             = ctx.request.body.appId
    let template_id_short = ctx.request.body.template_id_short
    let res               = await API.addTemplate(appId, template_id_short)
    ctx.body = res
})

/**
 * 获取消息模板列表
*/
router.post('/getTemplates', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.getTemplates(appId)
    ctx.body = res
})

/**
 * 删除消息模板
*/
router.post('/deleteTemplate', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let res   = await API.deleteTemplate(appId)
    ctx.body = res
})

/**
 * 微信JS-SDK
*/
router.post('/jssdk', async (ctx, next) => {
    let appId = ctx.request.body.appId
    let url   = ctx.request.body.url
    let res   = await API.jssdk(appId, url)
    ctx.body = res
})

/**
 * 创建二维码(公众号)
*/
router.post('/createQrcode', async (ctx, next) => {
    let appId          = ctx.request.body.appId
    let scene_str      = ctx.request.body.scene_str
    let expire_seconds = ctx.request.body.expire_seconds
    let res = await API.createQrcode(appId, action_name, scene_str, expire_seconds)
    ctx.body = res
})

/**
 * 获取用户增减数据
*/
router.post('/getUserSummary', async (ctx, next) => {
    let appId      = ctx.request.body.appId
    let begin_date = ctx.request.body.begin_date
    let end_date   = ctx.request.body.end_date
    let res = await API.getUserSummary(appId, begin_date, end_date)
    ctx.body = res
})

/**
 * 获取累计用户数据
*/
router.post('/getUserCumulate', async (ctx, next) => {
    let appId      = ctx.request.body.appId
    let begin_date = ctx.request.body.begin_date
    let end_date   = ctx.request.body.end_date
    let res = await API.getUserCumulate(appId, begin_date, end_date)
    ctx.body = res
})

/**
 * 获取媒体文件
*/
router.post('/getMedia', async (ctx, next) => {
    let appId   = ctx.request.body.appId
    let mediaId = ctx.request.body.mediaId
    let res = await API.getMedia(appId, mediaId)
    ctx.body = res
})


module.exports = router