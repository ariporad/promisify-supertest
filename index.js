/**
* Most of this is taken from npm.im/supertest-promised.
*/

var request = require('supertest')

if (!Promise) {
  throw new Error('Supertest-promise requires native promises or a polyfill.')
}

var fakeApp = {
  address: function () {
    return {
      address: '0.0.0.0',
      port: 0
    }
  },
  listen: function () {}
}

var proto = Object.getPrototypeOf(request(fakeApp).get('/'))
var end = proto.end
proto.end = function (cb) {
  if (typeof cb === 'function') return end.apply(this, arguments)

  return new Promise(function (good, bad) {
    end.call(this, function (err, res) {
      if (err) return bad(err)
      else return good(res)
    })
  }.bind(this))
}

module.exports = request
