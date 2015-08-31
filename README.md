# promisify-supertest
---
[![npm version](https://badge.fury.io/js/promisify-supertest.svg)](http://badge.fury.io/js/promisify-supertest) [![Build Status](https://travis-ci.org/ariporad/promisify-supertest.svg)](https://travis-ci.org/ariporad/promisify-supertest) [![Dependency Status](https://david-dm.org/ariporad/promisify-supertest.svg)](https://david-dm.org/ariporad/promisify-supertest) [![devDependency Status](https://david-dm.org/ariporad/promisify-supertest/dev-status.svg)](https://david-dm.org/ariporad/promisify-supertest#info=devDependencies) [![peerDependency Status](https://david-dm.org/ariporad/promisify-supertest/peer-status.svg)](https://david-dm.org/ariporad/promisify-supertest#info=peerDependencies)
---
[SuperTest](npm.im/supertest) + Promises. Uses native promises instead of
bluebird.

---

## Installation:

    npm i -D promisify-supertest

---

## Usage

It's a drop-in replacement for SuperTest

```javascript
var request = require('promisify-supertest'); 
```

Also, it modifies the main supertest module handy with ES2015:

```javascript
import 'promisify-supertest';
import request from 'supertest'; // Still promisified.
```

Then, just omit a callback, and it returnes a promise
```javascript
request(app)
	.get('/')
	.end()
	.then(function(res) { /* blah blah blah */ })
	.catch(function(err) { throw err; });

// But this still works too:
request(app)
	.get('/')
	.end(function(err, res) {
		if (err) throw err;
		// blah blah blah
	});
```

---

## Contributing

PR's welcome! 

Check in the issue tracker for issues, then file a fix one of them and send a PR! 

Please make sure to have your code comply with standard (I know, but it was easy):

    npm run lint


And make sure it passes the tests (and please add more for any feature you add!):

    npm run test

---

## License

[MIT: http://ariporad.mit-license.org](http://ariporad.mit-license.org)
