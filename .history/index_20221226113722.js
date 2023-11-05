const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const usersRouter = new Router({ prefix: '/users' })
console.log('1111')
router.get('/', (ctx) => {
  console.log(ctx,'ctx')
  ctx.body ='user list'
})
usersRouter.get('/', (ctx) => {
  ctx.body =[{name:'Lily'},{name:'Macy'}]
})
usersRouter.post('/', (ctx) => {
  console.log(ctx,'ctx')
  ctx.body={name:'Jessie'}
})
usersRouter.get('/:id', (ctx) => {
  ctx.body = `user id is ${ctx.params.id}`;
  
})
usersRouter.put('/:id', (ctx) => {
  ctx.body ={name:'Jessie'};
})
usersRouter.delete('/:id', (ctx) => {
  ctx.status = 204;
})

app.use(bodyparser());
app.use(router.routes());
app.use(usersRouter.routes());
app.use(usersRouter.allowedMethods());

app.listen(3000);