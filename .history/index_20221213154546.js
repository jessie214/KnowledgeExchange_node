const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();

app.use((ctx) => {
  ctx.body = 'Hello world!';
})

app.listen(3000);