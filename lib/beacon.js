var queryString = require('query-string');
var browser = require('./browser_info');
module.exports = function(params, callback) {
    params.time = new Date().getTime(); // identify current action time
    if (document.referrer) {
        params.re = document.referrer;
    }
    params.url = document.location.href;
    params.sr = browser.screen();
    // if no uuid, report cookie
    if (!params.uuid) {
        params.cookie = document.cookie;
    }
    var img = new Image();
    var loaded = false;

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
    // img.src = 'https://dn-seekr.qbox.me/x.gif?' + queryString.stringify(params);
    img.src = 'http://seekr.timo.today/x.gif?' + queryString.stringify(params);
    if (img.complete) {
        loadHandler();
    }
    // 返回204的不会显示加载成功，先用这种方式
    setTimeout(function() {
        callback && callback();
    }, 500);
};