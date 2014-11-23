// 页面浏览统计
// 如果为bbs页面，会附带tid和fid方便后面跑统计

var BBS = require('seedit-bbs');
var beacon = require('../lib/beacon');

module.exports = function(_) {
    beacon({
        ev: 'vp',
        sid: _.sid,
        uuid:_.uuid
    });
};