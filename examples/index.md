# Demo

---

## Normal usage

````javascript
seajs.use(['index','lib/uuid'], function(tracker,Uuid) {
	tracker.init({
		cookieDomain: 'bozhong.com'
	});

	console.log(tracker.track);
	tracker.track('hello',{
		name: 'hello',
		data: 'world'
	});


	Uuid.init({
		cookieDomain: 'bozhong.com'
	});

	var uuid = Uuid.get();

	console.log(uuid);
});
````
