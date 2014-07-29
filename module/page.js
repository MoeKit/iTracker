// 页面浏览统计
// 如果为bbs页面，会附带tid和fid方便后面跑统计

var BBS = require('seedit-bbs');

// 帖子页
if (BBS.page.isTopic) {

// 列表页
} else if (BBS.page.isNode()) {

// 其他页面
} else {

}

