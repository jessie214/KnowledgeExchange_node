const fs = require('fs');
module.exports = (app) => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') { return; }
    //提取实例
    const route = require(`./${file}`);
    //注册
    app.use(route.routes()).use(route.allowedMethods());
  })
}


