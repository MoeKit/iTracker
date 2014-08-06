// @todo 非线上环境不执行
// 不依赖于本地存储去判断是否为老用户，靠服务端跑数据确定
// 设置uuid
// 检查是否有uuid
// @todo 发送统计脚本的版本，方便后续处理

var cookie = require('cookie');
var Store = require('local-store');
var nameStore = require('name-store');
var Bbs = require('seedit-bbs');
var jsonp = require('./lib/jsonp');

exports.init = function (option) {
    var Uuid = require('./lib/uuid');
// initialize uuid
    Uuid.init({
        cookieDomain: option.cookieDomain || 'seedit.com'
    });
// get uuid
    var uuid = Uuid.get();

    require('./module/identity')(uuid);
    require('./module/sina_uid')(uuid);

// beacon function
    var beacon = require('./lib/beacon');
    var queryString = require('query-string');

// md5 用以检测数据是否有变化
    require('./module/page');

};


