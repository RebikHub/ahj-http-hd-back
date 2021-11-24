const Koa = require('koa');
const app = new Koa();
// const uuidv4 = require("uuid/v4");
const port = process.env.PORT || 3333;

// uuidv4()

const ticket = {
    id: 'идентификатор (уникальный в пределах системы)',
    name: 'краткое описание',
    status: 'boolean - сделано или нет',
    created: 'дата создания (timestamp)'
}

const ticketFull = {
    id: 'идентификатор (уникальный в пределах системы)',
    name: 'краткое описание',
    description: 'полное описание',
    status: 'boolean - сделано или нет',
    created: 'дата создания (timestamp)'
}

const tickets = [ticket, ticketFull];

app.use(async (ctx, next) => {
    const origin = ctx.request.get('Origin');
    if (!origin) {
        return await next();
    }
    const headers = {'Access-Control-Allow-Origin':'*',};
    if (ctx.request.method!=='OPTIONS') {
        ctx.response.set({...headers});
        try {
            return await next();
        } catch (e) {
            e.headers = {...e.headers, ...headers};
            throw e;
        }
    }
    if (ctx.request.get('Access-Control-Request-Method')) {
        ctx.response.set({...headers,'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, PATCH',});
        if (ctx.request.get('Access-Control-Request-Headers')) {
            ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Allow-Request-Headers'));
        }
        ctx.response.status = 204;// No content
    }
});

app.use(async ctx => {
    if (ctx.request.url === '/allTickets') {
        console.log(ctx.request.url);
        ctx.response.body = tickets;
        return;
            // ctx.response.status = 404;
            // return;
    }
});

// app.use(async ctx => {
//     console.log(ctx.request);
//     if (ctx.request.url === '/create') {
//         console.log(ctx.response);
//     }
// });

app.listen(port, () => console.log('Server started'));