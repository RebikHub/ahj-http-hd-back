const Koa = require('koa');
const app = new Koa();
const port = process.env.PORT || 3333;

app.use(ctx => {
    ctx.body = 'Hello Koa';
});


// const ticket = {
//     id: 'идентификатор (уникальный в пределах системы)',
//     name: 'краткое описание',
//     status: 'boolean - сделано или нет',
//     created: 'дата создания (timestamp)'
// }

// const ticketFull = {
//     id: 'идентификатор (уникальный в пределах системы)',
//     name: 'краткое описание',
//     description: 'полное описание',
//     status: 'boolean - сделано или нет',
//     created: 'дата создания (timestamp)'
// }

// const tickets = [ticket, ticketFull];

// app.use(async ctx => {
//     // ctx.body = 'Hello ddd World';
//     const { method } = ctx.request.querystring;
//     console.log(method);
//     switch (method) {
//         case 'allTickets':
//             ctx.response.body = tickets;
//             return;
//         // TODO: обработка остальных методов
//         default:
//             ctx.response.status = 403;
//             return;
//     }
// });

app.listen(port);