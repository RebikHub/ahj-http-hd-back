// const port = process.env.PORT || 7070;
// const server = http.createServer(app.callback()).listen(port);

const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);