/**
 * tracker
 */
var beacon = require('../lib/beacon');
var querystring = require('query-string');
var Hub = require('../module/hub');
module.exports = function(data) {
	return function(event, _data) {
		_data.u = location.href;
		var _tosend = {
			s:Hub.get('sid'),
			a:Hub.get('appid'),
			e: event,
			i: {
				uuid: Hub.get('uuid')
			},
			d: _data
		};

		if (Hub.get('uid')) {
			_tosend.i.uid = Hub.get('uid');
		}
		beacon(_tosend);
	};
};