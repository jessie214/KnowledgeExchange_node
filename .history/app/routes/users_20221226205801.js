const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const {find,findById,create,update,delete} = require('../controllers/users')

router.get('/', (ctx) => {
  ctx.body =db
})
router.post('/', (ctx) => {
  
})
router.get('/:id', (ctx) => {
  
  
})
router.put('/:id', (ctx) => {
  
})
router.delete('/:id', (ctx) => {
  
})

module.exports = router;