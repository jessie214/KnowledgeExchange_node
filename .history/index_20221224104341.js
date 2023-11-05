const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const usersRouter = new Router({ prefix: '/users' })

router.get('/', (ctx) => {
  ctx.body =[{name:'Lily'},{name:'Macy'}]
})
usersRouter.get('/', (ctx) => {
  ctx.box ='user list'
})
usersRouter.post('/', (ctx) => {
  ctx.box='create a user'
})
usersRouter.get('/:id', (ctx) => {
  ctx.body = `user id is ${ctx.params.id}`;
})
usersRouter.put('/:id', (ctx) => {
  ctx.body = `user id is ${ctx.params.id}`;
})
usersRouter.delete('/:id', (ctx) => {
  ctx.body = `user id is ${ctx.params.id}`;
})
app.use(router.routes());
app.use(usersRouter.routes());

app.listen(3000);