const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

app.use((ctx) => {
  ctx.body = 'Hello world!';
})

app.listen(3000);