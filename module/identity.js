// 与uuid联结的uid信息
var beacon = require('../lib/beacon');
module.exports = function (uid, uuid) {
    beacon({
        event: 'identify',
        uuid: uuid,
        uid: uid
    });
};