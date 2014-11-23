// 获取新浪微博uid
var url = 'https://api.weibo.com/2/account/get_uid.json?source=2456743075&';
var beacon = require('../lib/beacon');
var uid = require('../lib/uid');
var store = require('local-store');
var jsonp = require('../lib/jsonp');
module.exports = function(uuid) {
    if (!store.get('_sina') && document.location.href.indexOf('m.bozhong.com') === -1) {
        jsonp(url, {}, 'callback', function(data) {
            if (data.code === 1) {
                beacon({
                    ev: 'sina',
                    uuid: uuid,
                    sina_id: data.data.uid
                }, function() {
                    store.set('_sina', data.data.uid);
                });
            } else {
                // no sina id
            }
        });
    }
};