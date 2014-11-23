/**
 * tracker
 */
var beacon = require('../lib/beacon');
var querystring = require('query-string');
var Hub = require('../module/hub');
module.exports = function(data) {

	beacon({
		ev: 'event',
		data: querystring.stringify(data),
		sid: Hub.get('sid'),
		uuid: Hub.get('uuid')
	});
};