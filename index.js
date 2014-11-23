// @todo 非线上环境不执行
// <delete>不依赖于本地存储去判断是否为老用户，靠服务端跑数据确定</delete>
// 设置uuid
// 检查是否有uuid
// @todo 发送统计脚本的版本，方便后续处理

var cookie = require('cookie');
var Store = require('local-store');
var nameStore = require('name-store');
var Bbs = require('seedit-bbs');
var jsonp = require('./lib/jsonp');
var Session = require('./module/session');
var Hub = require('./module/hub');

exports.init = function(option) {
    var Uuid = require('./lib/uuid');
    // initialize uuid
    Uuid.init({
        cookieDomain: option.cookieDomain || 'bozhong.com'
    });
    // get uuid
    var uuid = Uuid.get();
    Hub.set('uuid',uuid);
    require('./module/identity')(uuid);
    require('./module/sina_uid')(uuid);

    // init session
    var session = new Session({
        domain: option.cookieDomain
    }).init();

    var sid = session.getSessionId();
    Hub.set('sid',sid);

    // beacon function
    var beacon = require('./lib/beacon');
    var queryString = require('query-string');

    // md5 用以检测数据是否有变化
    require('./module/page')({
        sid: sid,
        uuid: uuid
    });
};


exports.track = require('./module/tracker');