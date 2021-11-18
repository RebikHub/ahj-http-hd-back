const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3333);

const ticket = {
    id, // идентификатор (уникальный в пределах системы)
    name, // краткое описание
    status, // boolean - сделано или нет
    created, // дата создания (timestamp)
}

const ticketFull = {
    id, // идентификатор (уникальный в пределах системы)
    name, // краткое описание
    description, // полное описание
    status, // boolean - сделано или нет
    created, // дата создания (timestamp)
}

const tickets = [ticket, ticketFull];

app.use(async ctx => {
    const { method } = ctx.request.querystring;

    switch (method) {
        case 'allTickets':
            ctx.response.body = tickets;
            return;
        // TODO: обработка остальных методов
        default:
            ctx.response.status = 404;
            return;
    }
});
