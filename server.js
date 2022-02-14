const data = require('./tickets');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const app = new Koa();
const { v4: uuidv4 } = require('uuid');
const port = process.env.PORT || 3333;

app.use(koaBody({ urlencoded:true, }));

app.use(
    cors({
        origin: '*',
        credentials: true,
        'Access-Control-Allow-Origin': true,
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
)

app.use(async ctx => {
    const { method, id } = ctx.request.query;
    if (method === 'allTickets') {
        ctx.response.body = JSON.stringify(data.tickets);
        return;
    }

    if (method === 'ticketById') {
        data.fullTickets.forEach((item) => {
            if (item.id === id) {
                ctx.response.body = item.description;
            }
        })
        return;
    }

    if (method === 'statusId') {
        data.fullTickets.forEach((item) => {
            if (item.id === id) {
                if (item.status === true) {
                    item.status = false;
                } else {
                    item.status = true;
                }
            }
        })
        data.tickets.forEach((item) => {
            if (item.id === id) {
                if (item.status === true) {
                    item.status = false;
                } else {
                    item.status = true;
                }
            }
        })
        return;
    }

    if (method === 'deleteId') {
        let indexF = null;
        let index = null;
        data.fullTickets.forEach((item, i) => {
            if (item.id === id) {
                indexF = i;
            }
        })
        data.fullTickets.splice(indexF, 1);
        data.tickets.forEach((item, i) => {
            if (item.id === id) {
                index = i;
            }
        })
        data.tickets.splice(index, 1);
        return;
    }

    if (method === 'createTicket') {
        const ticket = JSON.parse(ctx.request.body);

        if (ticket.id) {
            data.tickets.forEach((item) => {
                if (item.id === ticket.id) {
                    item.name = ticket.name;
                    item.status = ticket.status;
                }
            })
            data.fullTickets.forEach((item) => {
                if (item.id === ticket.id) {
                    item.name = ticket.name;
                    item.description = ticket.description;
                    item.status = ticket.status;
                }
            })
            return;
        }
        ticket.id = uuidv4();
        data.fullTickets.push(ticket);
        data.tickets.push({
            id: ticket.id,
            name: ticket.name,
            status: ticket.status,
            created: ticket.created
        });
        ctx.response.status = 200;
        return;
    }

    ctx.response.status = 404;
    return;
});

// app.use(async (ctx) => {
//     let method;
//     if (ctx.request.method === 'GET') ({ method } = ctx.request.query);
//     else if (ctx.request.method === 'POST') ({ method } = ctx.request.body);
  
//       ctx.response.status = 200;
      
//     switch (method) {
//       case 'allTickets': ctx.response.body = ticketController.getTickets();
//         break;
//       case 'ticketById': ctx.response.body = ticketController.getTicketById(ctx.request.query);
//         break;
//       case 'createTicket': ctx.response.body = ticketController.createTicket(ctx.request.body);
//         break;
//       case 'changeStatus': ctx.response.body = ticketController.changeStatus(ctx.request.body);
//         break;
//       case 'updateTicket': ctx.response.body = ticketController.updateTicket(ctx.request.body);
//         break;
//       case 'deleteTicket': ctx.response.body = ticketController.deleteTicket(ctx.request.body);
//         break;
//       default:
//         ctx.response.status = 400;
//         ctx.response.body = `Unknown method '${method}' in request parameters`;
//     }
//   });


app.listen(port, () => console.log('Server started'));
