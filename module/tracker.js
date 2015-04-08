/**
 * tracker
 */
var beacon = require('../lib/beacon');
var querystring = require('query-string');
var Hub = require('../module/hub');
module.exports = function(data) {
	return function(event, _data) {
		_data.c = Hub.get('sid');
		_data.u = location.href;
		beacon({
			e: event,
			i: {
				uuid: Hub.get('uuid')
			},
			d: _data
		});
	};
};