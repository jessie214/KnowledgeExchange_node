const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const { find, findById, create, update, deleteUser,login } = require('../controllers/users');

// create a function that will be called when the user authenticated
const auth = async () => {
   
}

router.get('/', find)
router.post('/',create)
router.get('/:id', findById)
router.patch('/:id',update)
router.delete('/:id', deleteUser)
router.post('/login',login);

module.exports = router;