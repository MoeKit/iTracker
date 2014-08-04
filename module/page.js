// 页面浏览统计
// 如果为bbs页面，会附带tid和fid方便后面跑统计

var BBS = require('seedit-bbs');
var beacon = require('../lib/beacon');
// 帖子页
if (BBS.page.isTopic()) {
    beacon({
        event: 'view_topic',
        tid: BBS.page.getTid(),
        fid: BBS.page.getFid()
    });
// 列表页
} else if (BBS.page.isNode()) {
    beacon({
        event: 'view_node',
        fid: BBS.page.getFid()
    });
// 其他页面
} else {
    beacon({
        event:'vp'
    });
}

