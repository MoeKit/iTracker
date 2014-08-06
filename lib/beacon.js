var uuid = require('./uuid').get();
var queryString = require('query-string');
module.exports = function(params, callback) {
    params.uuid = uuid;
    params.time = new Date().getTime(); // identify current action time
    params.re = document.referrer;
    params.url = document.location.href;
    var img = new Image();
    var loaded = false;

    function loadHandler() {
        if (loaded) {
            return;
        }
        loaded = true;
        /* your code */
        callback();
    }
    img.onload = loadHandler;
    img.onerror = function(e){
        //console.log(e);
    };
    img.src = 'http://beacon.raosee.com/t.gif?' + queryString.stringify(params);
    if (img.complete) {
        loadHandler();
    }
    // 返回204的不会显示加载成功，先用这种方式
    setTimeout(function(){
        callback && callback();
    },500);
};