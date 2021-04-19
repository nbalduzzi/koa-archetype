import { Context, Next } from 'koa';
import { IParamMiddleware } from 'koa-router';

export function isAuthenticatedUser(): IParamMiddleware {
  return async function (id: string, ctx: Context, next: Next) {
    if (ctx.state.user.userId && ctx.state.user.userId === id) {
      return await next();
    }

    ctx.status = 403;
    ctx.body = {
      error: 'Forbidden',
      message: 'user not allowed',
    };
  };
}
