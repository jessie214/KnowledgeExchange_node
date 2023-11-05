const fs = require('fs');
module.exports = (app) => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') { return; }
    const route = require(`./${file}`);
    app.use(routes()).use(route.allowedMethods());
  })
}



app.use(bodyparser());
app.use(router.routes());
app.use(usersRouter.routes());
app.use(usersRouter.allowedMethods());

app.listen(3000);