const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx) => {
  ctx.body ='the Home page'
})


module.exports = router;