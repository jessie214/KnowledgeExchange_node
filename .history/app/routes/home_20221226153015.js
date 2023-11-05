const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx) => {
  ctx.body ='Yhe Home page'
})


module.exports = router;