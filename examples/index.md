# Demo

---

## Normal usage

````javascript
seajs.use('index', function(tracker) {
	
  tracker.init({
  cookieDomain:'seedit.com'
  });

  console.log(tracker.track);
	tracker.track({
		name:'hello',
		data:'world'
	});
	
});
````
