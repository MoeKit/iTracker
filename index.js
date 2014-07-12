var iTracker;

// 不依赖于本地存储去判断是否为老用户，靠服务端跑数据确定

// 设置uuid
// 检查是否有uuid
//
var cookie = require('cookies');
var Store = require('local-store');
var Bbs = require('seedit-bbs');
/**
 * -----------------------------------
 * 确认uuid已经存在
 * -----------------------------------
 */
var uuid = require('uuid');
var getUuidByCookie = function () {
    return cookie.get('suuid', {
        domain: 'seedit.com',
        path: '/'
    });
};
var setUuidByCookie = function (uuid) {
    cookie.set('suuid', uuid, {
        domain: 'seedit.com',
        expires: 365,
        path: '/'
    });
}

var hasUuid = Store.get('uuid') || getUuidByCookie();

if (hasUuid) {
    // 没有设置cookie
    if (!getUuidByCookie()) {
        setUuidByCookie(hasUuid);
    }
} else {
    // 没有uuid设置时
    hasUuid = uuid.v4();
    setUuidByCookie(hasUuid);
}

// 顺便保存一份到store
if (!Store.get('uuid') || Store.get('uuid') !== hasUuid) {
    Store.set('uuid', hasUuid);
}


/**
 * -----------------------------------
 * 公用函数
 * -----------------------------------
 */
var queryString = require('query-string');
var beacon = function (event,params) {
    params.event = event;
    params.uuid = hasUuid;
    params.time = new Date().getTime();
    new Image().src = 'http://106.3.38.38:8004/api/v2/log?' + queryString.stringify(params);
};

/**
 * -----------------------------------
 * 发送 alias uid
 * -----------------------------------
 */

if (Store.get('uid') && !Store.get('log_alias')) {
    beacon({
        event: 'alias',
        detail: {
            uuid: hasUuid,
            uid: Store.get('uid')
        }
    });
    Store.set('log_alias', '1');
}


/**
 * -----------------------------------
 * 发送版块浏览 fid
 * -----------------------------------
 */
if (Bbs.page.isNode()) {
    beacon({
        event: 'view_node',
        detail: {
            tid: Bbs.page.getFid()
        }
    });
}


/**
 * -----------------------------------
 * 发送页面浏览 tid
 * -----------------------------------
 */
if (Bbs.page.isTopic()) {
    beacon({
        event: 'view_topic',
        detail: {
            tid: Bbs.page.getTid()
        }
    });
}

/**
 * -----------------------------------
 * 发送搜索词 search
 * 搜索引擎，站内搜索，wap搜索
 * -----------------------------------
 */

var Visitor = require('visit-from');

beacon({
    event: 'search',
    detail: {
        key: Visitor.key,
        domain: Visitor.domain
    }
});


module.exports = iTracker;
