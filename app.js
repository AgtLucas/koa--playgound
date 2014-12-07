var koa = require('koa');
var app = koa();
var router = require('koa-router');

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


app.listen(3000);