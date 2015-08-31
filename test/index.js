var expect = require('chai').expect
var express = require('express')
var decache = require('decache')

if (!Promise) throw new Error('requires native promises');

describe('promisify-supertest', function () {
	var app, request;
	beforeEach(function(){
		app = express();
		app.get('/', function(req, res) {
			res.end('hello world')
		})
		app.get('/error', function(req, res) {
			res.status(500);
			res.end('error');
		})
		request = require('../index');
	});
	afterEach(function(){
		delete require.cache[require.resolve('../index')]
	});
	it('should return a promise if no callback is provided', function () {
		var p = request(app).get('/').end()
		expect(p).to.be.an.instanceof(Promise);
	});
	it('should resolve the promise with res if nothing bad happened', function (done) {
		var p = request(app).get('/').end()
		p.then(function(res) {
			expect(res.text).to.eql('hello world')
			done();
		}, done)
	});
	it('should reject the promise with an error if something bad happened', function (done) {
		var p = request(app).get('/error').expect(200).end()
		p.catch(function(err) {
			done();
		});
	});
	it('should sill use a callback if one is provided', function (done) {
		request(app).get('/').end(done);
	});
	it('should allow you to require supertest and still return a promise', function() {
		var p = require('supertest')(app).get('/').end();
		expect(p).to.be.an.instanceof(Promise);
	});
});