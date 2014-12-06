var koa = require('koa');
var app = koa();

var router = require('koa-router');

app.use(function *() {
  this.body = "Yo!";
});

app.listen(5000);