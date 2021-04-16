import { config } from 'dotenv';
import auth from 'koa-basic-auth';
import Router from 'koa-router';

const healthRouter = new Router({ prefix: '/health' });

healthRouter.use(async (ctx, next) => {
  auth({
    name: ctx.get('HEALTH_CHECK_USER'),
    pass: ctx.get('HEALTH_CHECK_PASSWORD'),
  });

  await next();
});

healthRouter.get('/', async (ctx) => {
  ctx.status = 200;
  ctx.body = {
    nodeVersion: process.version,
    service: 'TypeScriptNode',
    memory: process.memoryUsage(),
    pid: process.pid,
    uptime: process.uptime(),
    environment: 'dev',
    appVersionPackage: '1.0.0',
  };
});

export default healthRouter;
