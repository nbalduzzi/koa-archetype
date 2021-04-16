import { config } from 'dotenv';
import Router from 'koa-router';
import { Container } from 'typescript-ioc';
import CharacterController from '../controllers/character.controller';

Container.bindName('envs').to(config().parsed!);
const characterController = Container.get(CharacterController);
const characterRouter = new Router({ prefix: '/characters' });

characterRouter.get('/', async (ctx) => {
  ctx.status = 200;
  ctx.body = await characterController.getCharacters(
    ctx.query.page?.toString(),
  );
});

characterRouter.get('/:id', async (ctx) => {
  ctx.status = 200;
  ctx.body = await characterController.getCharacter(ctx.params.id);
});

export default characterRouter;
