// 默认会话过期时间为30分钟
// 每次刷新页面，重新设置时间为30分钟

var CookieStore = require('cookie-store');
var hasInit = false;

var session = function(option) {
	this.o = option;
};

session.prototype.init = function() {
	this._initStore();
	var sid = this.store.get('sid');
	var sda = this.store.get('sda');
	if (!sid) {
		this.setId();
		this.setDate();
	} else if (this.store.get('sid')) {
		// has expired 
		if (new Date().getTime() > (parseInt(sda) + 30 * 60 * 1000)) {
			this.setId();
			this.setDate();
		} else { // hasn't expired
			this.setDate();
		}
	}
	hasInit = true;
	return this;
};

session.prototype._initStore = function() {
	this.store = new CookieStore('seekr_', {
		domain: this.o.domain,
		path: this.o.path || '/',
		expires: this.o.expires || 365
	});
	return this;
};

session.prototype.setDate = function() {
	this.store.put('sda', new Date().getTime());
	return this;
};

session.prototype.setId = function() {
	this.store.put('sid', new Date().getTime());
	return this;
};

session.prototype.getSessionId = function() {
	var sid = this.store.get('sid');
	var date = new Date(sid*1);
	return date.getHours()+''+date.getMinutes()+date.getSeconds();
};

module.exports = session;
module.exports.hasInit = hasInit;