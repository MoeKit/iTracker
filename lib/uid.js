// 获取uid

var jsonp = require('./jsonp');

exports.get = function(callback) {
    //如果没有登录，返回false
    if(!/_auth/.test(document.cookie)){
        return callback(false);
    }

    // 1.discuz页面会暴露 discuz_uid
    if(window.discuz_uid){
        return callback(window.discuz_uid);
    }

    // 2.seedit.user会暴露用户信息
    if(window.seedit && window.seedit.user){
        return callback(seedit.user.uid);
    }

    // 3.获取用户信息，这部分可能会产生额外请求，需要优化
    jsonp('http://common.seedit.com/bbs/common_member.jsonp',{},'__c',function(data){
        return callback(data.uid);
    });

};