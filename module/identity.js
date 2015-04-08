// 与uuid联结的uid信息
var beacon = require('../lib/beacon');
var uid = require('../lib/uid');
var store = require('local-store');
module.exports = function(uuid) {
    if (!store.get('_identify')) {
        uid.get(function(uid) {
            if (uid) {
                beacon({
                    e: '$identify',
                    i: {
                        uuid: uuid,
                        uid: uid
                    }
                }, function() {
                    store.set('_identify', true);
                });
            } else {
                // no uid
            }
        });
    }
};