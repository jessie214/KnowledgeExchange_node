class HomeCtl{
  index(ctx) {
    ctx.body ='the Home page'
  }
}

module.exports = new HomeCtl();