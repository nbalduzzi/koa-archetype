import { Context, Next } from 'koa';
import { connect } from 'mongoose';

export default function mongoConnect() {
  return async function (ctx: Context, next: Next) {
    await connect(ctx.envs.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      user: ctx.envs.MONGODB_USER,
      pass: ctx.envs.MONGODB_PASSWORD,
      dbName: ctx.envs.MONGODB_DBNAME,
    });

    return await next();
  };
}
