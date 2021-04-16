import auth from 'koa-basic-auth';
import Router from 'koa-router';

const healthRouter = new Router({ prefix: '/health' });

healthRouter.use(
  auth({
    name: process.env.HEALTH_CHECK_USER!,
    pass: process.env.HEALTH_CHECK_PASSWORD!,
  }),
);

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
