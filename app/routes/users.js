const jwt = require('koa-jwt');
const { secret } = require('../config');
const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const { find, findById, create, update, deleteUser,login,checkOwner } = require('../controllers/users');

// create a function that will be called when the user authenticated
const auth = jwt({ secret });

router.get('/', find)
router.post('/',create)
router.get('/:id', findById)
router.patch('/:id',auth, checkOwner, update)
router.delete('/:id',auth, checkOwner, deleteUser)
router.post('/login',login);

module.exports = router;