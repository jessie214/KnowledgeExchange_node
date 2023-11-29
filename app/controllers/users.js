const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users');
const { secret } = require('../config');

const db = [{ name: 'jessie' }]
class UsersCtl {
  async find(ctx) {
    ctx.body = await User.find();
  }
  async findById(ctx) { 
    const user = await User.findById(ctx.params.id);
    if (!user) { ctx.throw(404, 'user not found'); }
    ctx.body = user;
  }
  
  async create(ctx) { 
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password:{ type: 'string', required: true}
    });
    const { name } = ctx.request.body;
    const repeatedUser = await User.findOne({ name });
    if (repeatedUser) { ctx.throw(409, 'user already'); }
    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }
  async update(ctx) {    
    ctx.verifyParams({
      name: { type: 'string', required: true },
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) {
      ctx.throw(404,'user not found');
    }
    ctx.body = user;
  }
  async deleteUser(ctx) { 
    const user = await User.findByIdAndDelete(ctx.params.id);
    if(!user) {ctx.throw(404,'user not found')}
    ctx.status = 204;
  }
  async login(ctx){
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: {type: 'string', required: true},
    })
    
    const user = await User.findOne(ctx.request.body);
    if (!user) { ctx.throw(401, 'user or password is not exit') }
    const { _id, name } = user;
    const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1day' });
    ctx.body = { token }

  }
}

module.exports = new UsersCtl();