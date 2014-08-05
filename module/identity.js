// 与uuid联结的uid信息
var beacon = require('../lib/beacon');
var uid = require('../lib/uid');
var store = require('local-store');
module.exports = function(uuid) {
    if (!store.get('identify')) {
        uid.get(function(uid) {
            if (uid) {
                beacon({
                    event: 'identify',
                    uuid: uuid,
                    uid: uid
                }, function() {
                    store.set('identify', true);
                });
            } else {
                window.console && console.log('no uid');
            }
        });
    }
};