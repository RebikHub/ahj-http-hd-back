const http = require('http');

// for GET

const server = http.createServer((req,res) => {
    console.log(req);
    res.end('server response');
});
const port = 7070;

server.listen(port, (err) => {
    if (err) {
        console.log('Error occured:',error);
        return;
    }
    console.log(`server is listening on ${port}`);
});

// for POST

// const server = http.createServer((req,res) => {
//     const buffer = [];
//     req.on('data', (chunk) => {
//         buffer.push(chunk);
//     });
//     req.on('end', () => {
//         const body = Buffer.concat(buffer).toString();
//         console.log(body);
//     });
//     res.end('server response');
// });

// const http = require('http');
// const Koa = require('koa');
// const app = newKoa();
// app.use(async (ctx) => {
//     ctx.response.body = 'server response';
// });
// const server = http.createServer(app.callback()).listen(7070);
