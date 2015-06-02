# Demo

---

## Normal usage

````javascript
var tracker = require('../index');
var Uuid = require('../lib/uuid');
tracker.init({
	cookieDomain: 'bozhong.com',
	appid:'1'
});
tracker.track('hello',{
	name: 'hello',
	data: 'world'
});
````
