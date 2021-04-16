import { config } from 'dotenv';
import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import loggerKoa from 'koa-logger';
import cors from 'koa2-cors';
import compress from 'koa-compress';
import jwt from 'koa-jwt';
import mongo from './middlewares/mongo.middleware';
import errorHandler from './middlewares/errors.middleware';
import health from './routes/health.route';
import user from './routes/user.router';
import character from './routes/character.route';
import episode from './routes/episode.route';
import location from './routes/location.route';

//init
const app = new koa();

//load envs
app.context.envs = config().parsed!;

//middlewares
app.use(cors());
app.use(compress());
app.use(loggerKoa());
app.use(bodyParser());

//custom middlewares
app.use(mongo());
app.use(errorHandler());

// security
app.use(
  jwt({ secret: app.context.envs.SECRET }).unless({
    path: [/^\/health/, /^\/swagger-html/, /^\/swagger.json/],
  }),
);

//routes
app.use(health.routes());
app.use(user.routes());
app.use(character.routes());
app.use(episode.routes());
app.use(location.routes());

//export server
export default app;
