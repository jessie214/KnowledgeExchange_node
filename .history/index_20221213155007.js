const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body ='home page'
})

router.get('/users', (ctx) => {
  ctx.box ='user list'
})

router.post('/users', (ctx) => {
  ctx.box='create a user'
})

router.get('users/:id', (ctx) => {
  ctx.body = `user id is ${ctx.params.id}`;
})


app.use(router.routes());

app.listen(3000);