const Koa = require('koa2');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const cors = require('koa2-cors');

const {restify} = require('./rest');

const app = new Koa();

app.use(cors({
  origin: function (ctx) {
    return "*"; // 允许来自所有域名请求
  },
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// parse request body:
app.use(bodyParser());

// bind .rest() for ctx:
app.use(restify());

// add controllers:
console.log(controller)
app.use(controller());

module.exports = app;

