import Router from 'koa-router';
import { Container } from 'typescript-ioc';
import AuthController from '../controllers/auth.controller';

const authController = Container.get(AuthController);
const authRouter = new Router({ prefix: '/auth' });

authRouter.post('/register', async (ctx) => {
  ctx.status = 201;
  ctx.body = await authController.register(ctx.request.body);
});

authRouter.post('/login', async (ctx) => {
  ctx.status = 200;
  ctx.body = await authController.login(ctx.request.body);
});

export default authRouter;
