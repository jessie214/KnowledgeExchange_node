const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users');
const { secret } = require('../config');

const db = [{ name: 'jessie' }]
class UsersCtl {
  async find(ctx) {
    ctx.body = await User.find();
  }
  async findById(ctx) { 
    const { fields } = ctx.query;
    let selectFields = '';
    if (fields) {
      selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
    }
 
    const user = await User.findById(ctx.params.id).select(selectFields);
    if (!user) { ctx.throw(404, 'user not found') }
    ctx.body = user;
  }
  
  async create(ctx) { 
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
      avatar_url: { type: 'string', required: false },
      gender: { type: 'string', required: false },
      headline: { type: 'string', required: false },
      locations: { type: 'array', itemType: 'String', required: false },
      business: { type: 'string', required: false },
      employments: { type: 'array', itemType: 'object', required: false },
      educations: { type: 'array', itemType: 'object', required: false },
    });
    const { name } = ctx.request.body;
    const repeatedUser = await User.findOne({ name });
    if (repeatedUser) { ctx.throw(409, 'user already'); }
    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }
  // 
  async checkOwner(ctx,next) { 
    if (ctx.params.id !== ctx.state.user._id) { ctx.throw(403, 'Access Denied: You do not have permission') }
    await next();
  }
  async update(ctx) {    
    ctx.verifyParams({
      name: { type: 'string', required: false },
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
  async listFollowing(ctx) {
    const user = await User.findById(ctx.params.id).select('+following').populate('following');
    if (!user) { ctx.throw(404, 'user not found') }
    ctx.body = user.following;
  }
  async follow(ctx) { 
    const me = await User.findById(ctx.state.user._id).select('+following');
    if (!me.following.map(id=>id.toString()).includes(ctx.params.id)) {
      me.following.push(ctx.params.id);
      me.save();
    }  
    ctx.status = 204;
  }
}

module.exports = new UsersCtl();