const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
usersRouter.get('/', (ctx) => {
  ctx.body =db
})
usersRouter.post('/', (ctx) => {
  db.push(ctx.request.body)
  ctx.body=ctx.request.body
})
usersRouter.get('/:id', (ctx) => {
  ctx.body = db[ctx.params.id *1];
  
})
usersRouter.put('/:id', (ctx) => {
  db[ctx.params.id * 1] = ctx.request.body;
  ctx.body =ctx.request.body
})
usersRouter.delete('/:id', (ctx) => {
  db.splice(ctx.params.id *1, 1);
  ctx.status = 204;
})