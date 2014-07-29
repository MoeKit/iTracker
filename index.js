var iTracker = function () {

};

// 不依赖于本地存储去判断是否为老用户，靠服务端跑数据确定

// 设置uuid
// 检查是否有uuid
//
var cookie = require('cookies');
var Store = require('local-store');
var nameStore = require('name-store');
var Bbs = require('seedit-bbs');
var jsonp = require('./lib/jsonp');

// md5 用以检测数据是否有变化

// beacon 打点脚本

iTracker.prototype.initUuid = function () {
    /**
     * -----------------------------------
     * 确认uuid已经存在
     * uuid以localStorage为准，向cookie同步
     * -----------------------------------
     */
    var uuid = function () {
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    };

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
        hasUuid = uuid();
        setUuidByCookie(hasUuid);
    }

// 顺便保存一份到store
    if (!Store.get('uuid') || Store.get('uuid') !== hasUuid) {
        Store.set('uuid', hasUuid);
    }
};


/**
 * -----------------------------------
 * 公用函数
 * -----------------------------------
 */
var queryString = require('query-string');
var beacon = function (params) {
    params.uuid = hasUuid;
    params.time = new Date().getTime();// identiry current action time
    params.re = document.referrer;
    params.url = document.location.href;
    new Image().src = 'http://beacon.raosee.com/x.gif?' + queryString.stringify(params);
};

/**
 * -----------------------------------
 * 发送 alias uid
 * -----------------------------------
 */

if (Store.get('uid') && Store.get('log_alias') !== '3') {
    beacon({
        event: 'alias',
        uuid: hasUuid,
        uid: Store.get('uid')
    });
    Store.set('log_alias', '3');
}


/**
 * -----------------------------------
 * 发送版块浏览 fid
 * -----------------------------------
 */
if (Bbs.page.isNode()) {
    beacon({
        event: 'view_node',
        fid: Bbs.page.getFid()
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
        tid: Bbs.page.getTid(),
        fid: Bbs.page.getFid()
    });
}


var tracker = new iTracker();
// init uuid
tracker.initUuid();

exports = {};


