import { Context, Next } from 'koa';

export function isAuthenticatedUser() {
  return async function (id: string, ctx: Context, next: Next) {
    if (!ctx.state.user.userId || ctx.state.user.userId !== id) {
      ctx.status = 403;
      ctx.body = {
        error: 'Forbidden',
        message: 'user not allowed',
      };
    } else {
      return await next();
    }
  };
}
