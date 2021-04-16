import { Context, Next } from 'koa';
import { connect } from 'mongoose';

export default function mongoConnect() {
  return async function (ctx: Context, next: Next) {
    await connect(process.env.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASSWORD,
      dbName: process.env.MONGODB_DBNAME,
    });

    return await next();
  };
}
