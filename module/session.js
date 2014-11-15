// 默认会话过期时间为30分钟
// 每次刷新页面，重新设置时间为30分钟
var CookieStore = require('cookie-store');
var store = new CookieStore('seekr_',{
	domain:'bozhong.com',
	path:'/',
	expires:365
});

// set session id
exports.init = function(){
	var sid = store.get('sid');
	var sda = store.get('sda');
	if(!sid){
		store.put('sid',new Date().getTime());
		store.put('sda',new Date().getTime());
	}else if (store.get('sid')){

		// has expired 
		if(new Date().getTime()>(parseInt(sda)+30*60*1000)){
			store.put('sid',new Date().getTime());
			store.put('sda',new Date().getTime());
		}else{// hasn't expired
			store.put('sda',new Date().getTime());
		}
	}
};

exports.getSessionId = function(){
	return store.get('sid');
};
