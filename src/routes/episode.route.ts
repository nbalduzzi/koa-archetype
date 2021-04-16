import { config } from 'dotenv';
import Router from 'koa-router';
import { Container } from 'typescript-ioc';
import EpisodeController from '../controllers/episode.controller';

Container.bindName('envs').to(config().parsed!);
const episodeController = Container.get(EpisodeController);
const episodeRouter = new Router({ prefix: '/episodes' });

episodeRouter.get('/', async (ctx) => {
  ctx.status = 200;
  ctx.body = await episodeController.getEpisodes(ctx.query.page?.toString());
});

episodeRouter.get('/:id', async (ctx) => {
  ctx.status = 200;
  ctx.body = await episodeController.getEpisode(ctx.params.id);
});

export default episodeRouter;
