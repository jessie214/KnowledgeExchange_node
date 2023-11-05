const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const error = require('koa-json-error');
const app = new Koa();
const routing = require('./routes');

app.use(error());



app.use(bodyparser());
routing(app);

app.listen(3000,()=>console.log('start at 3000'));