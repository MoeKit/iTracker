// 页面浏览统计
// 如果为bbs页面，会附带tid和fid方便后面跑统计

var BBS = require('seedit-bbs');
var beacon = require('../lib/beacon');

module.exports = function(_) {
	var data = {
		e: '$page',
		d: {
			c: _.sid,
			r: document.referrer.replace('http://',''),
			u: document.location.href.replace('http://','')
		},
		i: {
			uuid: _.uuid
		}
	};
	window.fid && (data.fid = window.fid);
	beacon(data);
};