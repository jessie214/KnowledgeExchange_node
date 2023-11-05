const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const usersRouter = new Router({ prefix: '/users' })

router.get('/', (ctx) => {
  ctx.body ='user list'
})
usersRouter.get('/', (ctx) => {
  ctx.box =[{name:'Lily'},{name:'Macy'}]
})
usersRouter.post('/', (ctx) => {
  ctx.box={name:'Jessie'}
})
usersRouter.get('/:id', (ctx) => {
  ctx.body = `user id is ${ctx.params.id}`;
})
usersRouter.put('/:id', (ctx) => {
  ctx.body ={name:'Jessie2'};
})
usersRouter.delete('/:id', (ctx) => {
  ctx.status = 204;
})
app.use(router.routes());
app.use(usersRouter.routes());

app.listen(3000);