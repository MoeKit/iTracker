var queryString = require('query-string');
var browser = require('./browser_info');
var Fingerprint = require('fingerprintjs');

module.exports = function(params, callback) {
    params.t = new Date().getTime(); // identify current action time

    // browser info
    params.b = {};
    params.b.u = browser.ua();
    params.b.r = browser.screen();

    // if no uuid, report cookie
    if (!params.uuid) {
        //params.cookie = document.cookie;
    }

    // user info
    var img = new Image();
    var loaded = false;

    // fingerprint
    params.f = new Fingerprint({
        screen_resolution: true
    }).get();

    function loadHandler() {
        if (loaded) {
            return;
        }
        loaded = true;
        /* your code */
        callback && callback();
    }
    img.onload = loadHandler;
    img.onerror = function(e) {
        //console.log(e);
    };

    // flattern
    for (var i in params) {
        if (typeof params[i] === 'object') {
            params[i] = queryString.stringify(params[i]);
        }
    }

    img.src = 'http://iseekr.raosee.com/x.gif?' + queryString.stringify(params);
    if (img.complete) {
        loadHandler();
    }
    // 返回204的不会显示加载成功，先用这种方式
    setTimeout(function() {
        callback && callback();
    }, 500);
};