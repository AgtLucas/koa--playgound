var koa = require('koa');
var koaBody = require('koa-body')();
var router = require('koa-router');
var app = koa();

app.use(router(app));

var requestTime = function (headerName) {
  return function *(next) {
    var start = new Date();
    yield next;
    var end = new Date();
    var ms = end - start;
    this.set(headerName, ms - 'ms');
  }
}

app.use(requestTime('Response-titme'));

app.get('/', function *() {
  this.body = 'Hello Koa!';
});

app.get('/date', function *() {
  this.body = new Date();
});

app.post('/users', koaBody, function *(next) {
  console.log(this.request.body);
  this.body = JSON.stringify(this.request.body);
});

app.listen(3000);
console.log('curl -i http://localhost:3000/ -d "name=test"');