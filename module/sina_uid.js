// 获取新浪微博uid
var url ='https://api.weibo.com/2/account/get_uid.json?source=2456743075&';
var beacon = require('../lib/beacon');
var uid = require('../lib/uid');
var store = require('local-store');
var jsonp = require('../lib/jsonp');
module.exports = function(uuid) {
    if (!store.get('sina')) {
      jsonp(url,{},'callback',function(data){
        if (data.code===1) {
                beacon({
                    event: 'sina',
                    uuid: uuid,
                    sid:data.data.uid
                }, function() {
                    store.set('sina', true);
                });
            } else {
                window.console && console.log('no sina id ');
            }
      });
            
       
    }
};