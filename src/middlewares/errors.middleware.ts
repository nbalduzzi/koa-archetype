import { Context, Middleware, Next } from 'koa';
import { isBoom } from 'boom';

export default function errorHandler(): Middleware {
  return async function (ctx: Context, next: Next) {
    try {
      await next();
    } catch (err) {
      ctx.status = isBoom(err)
        ? err.output.statusCode
        : err.statusCode || err.status || 500;

      ctx.body = isBoom(err)
        ? err.output.payload
        : {
            message: err.message,
          };
    }
  };
}
