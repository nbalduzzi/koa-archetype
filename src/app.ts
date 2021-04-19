import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import loggerKoa from 'koa-logger';
import cors from 'koa2-cors';
import helmet from 'koa-helmet';
import compress from 'koa-compress';
import jwt from 'koa-jwt';
import serve from 'koa-static';
import docs from './middlewares/docs.middleware';
import mongo from './middlewares/mongo.middleware';
import errorHandler from './middlewares/errors.middleware';
import health from './routes/health.route';
import auth from './routes/auth.route';
import user from './routes/user.router';
import character from './routes/character.route';
import episode from './routes/episode.route';
import location from './routes/location.route';

//init
const app = new koa();

//middlewares
app.use(cors());
app.use(compress());
app.use(loggerKoa());
app.use(bodyParser());
app.use(serve('public'));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`, `https: 'unsafe-inline'`],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        connectSrc: [`'self'`, `http: 'unsafe-inline'`],
        styleSrc: ['self', `https: 'unsafe-inline'`],
      },
    },
  }),
);

//custom middlewares
app.use(mongo());
app.use(errorHandler());
app.use(docs());

//security
app.use(
  jwt({ secret: process.env.SECRET! }).unless({
    path: [/^\/health/, /^\/docs/, /\/auth/],
  }),
);

//routes
app.use(health.routes());
app.use(auth.routes());
app.use(user.routes());
app.use(character.routes());
app.use(episode.routes());
app.use(location.routes());

//export server
export default app;
