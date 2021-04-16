import Router from 'koa-router';
import { Container } from 'typescript-ioc';
import { isAuthenticatedUser } from '../middlewares/jwt.middleware';
import UserController from '../controllers/user.controller';

const userController = Container.get(UserController);
const userRouter = new Router({ prefix: '/users' });

userRouter.post('/', async (ctx) => {
  ctx.status = 201;
  ctx.body = await userController.registerUser(
    ctx.request.body.username,
    ctx.request.body.password,
  );
});

userRouter.get('/:username', async (ctx) => {
  ctx.status = 200;
  ctx.body = await userController.getUserByUsername(ctx.params.username);
});

userRouter.param('userId', isAuthenticatedUser());

userRouter.get('/:userId/favorites', async (ctx) => {
  ctx.status = 200;
  ctx.body = await userController.getUserFavorites(ctx.state.user.userId);
});

userRouter.get('/:userId/favorites/:id', async (ctx) => {
  ctx.status = 200;
  ctx.body = await userController.getUserFavorite(
    ctx.state.user.userId,
    ctx.params.id,
  );
});

userRouter.put('/:userId/favorites/:id', async (ctx) => {
  ctx.status = 200;
  ctx.body = await userController.saveUserFavorite(
    ctx.state.user.userId,
    ctx.params.id,
  );
});

export default userRouter;
