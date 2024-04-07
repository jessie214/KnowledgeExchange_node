const Koa = require('koa');
const { koaBody } = require('koa-body');
const  koaStatic = require('koa-static');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const app = new Koa();
const routing = require('./routes');
const mongoose = require('mongoose');
const path = require('path');

const { connectionStr } = require('./config');
mongoose.connect(connectionStr)
  .then(() => {
    console.log('MongoDB connection established');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
app.use(koaStatic(path.join(__dirname, 'public')))

app.use(error({
  postFormat:(e,{stack,...rest})=>process.env.NODE_ENV === 'production'? rest:{stack, ...rest}
}));



app.use(koaBody({
  multipart: true, // suports files
  formidable: {
    uploadDir: path.join(__dirname, 'public/uploads'),
    keepExtensions:true,
  }
}));
app.use(parameter(app));
routing(app);

app.listen(3000,()=>console.log('start at 3000'));