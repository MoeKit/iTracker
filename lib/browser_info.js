// get browser info
exports.screen = function(){
	return window.screen.width+'x'+window.screen.height;
};

// get ua info
exports.ua = function(){
	return navigator.userAgent;
};