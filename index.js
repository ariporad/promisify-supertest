/**
* Most of this is taken from npm.im/supertest-promised.
*/

var request = require('supertest')

var Test = request.Test

if (!Promise) {
  throw new Error('Supertest-promise requires native promises or a polyfill.')
}

var end = Test.prototype.end
Test.prototype.end = function (cb) {
  if (typeof cb === 'function') return end.apply(this, arguments)

  return new Promise(function (good, bad) {
    end.call(this, function (err, res) {
      if (err) return bad(err)
      else return good(res)
    })
  }.bind(this))
}

module.exports = request
