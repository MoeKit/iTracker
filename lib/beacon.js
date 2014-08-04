var uuid = require('./uuid').get();
var queryString = require('query-string');
module.exports = function (params) {
    params.uuid = uuid;
    params.time = new Date().getTime();// identify current action time
    params.re = document.referrer;
    params.url = document.location.href;
    new Image().src = 'http://beacon.raosee.com/x.gif?' + queryString.stringify(params);
};