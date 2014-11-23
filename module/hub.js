/**
 * data hub
 * used to store uuid and sid
 */

var data = {};

exports.set = function(k, v) {
	data[k] = v;
};

exports.get = function(k) {
	return data[k];
};