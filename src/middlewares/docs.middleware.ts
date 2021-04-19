import { Context, Middleware, Next } from 'koa';
import { koaSwagger } from 'koa2-swagger-ui';

export default function docs(): Middleware {
  return async function (ctx: Context, next: Next) {
    if (process.env.NODE_ENV !== 'production') {
      ctx.app.use(
        koaSwagger({
          title: 'Koa Archetype',
          swaggerOptions: {
            url: 'swagger.json',
            docExpansion: 'list',
            jsonEditor: false,
            defaultModelsExpandDepth: '0',
            showRequestHeaders: false,
            swaggerVersion: '1.0.0',
            validatorUrl: null,
          },
          routePrefix: '/docs',
          exposeSpec: false,
          hideTopbar: true,
          favicon: '/favicon.png',
        }),
      );
    }

    await next();
  };
}
