import Router from 'koa-router';
import { Container } from 'typescript-ioc';
import LocationController from '../controllers/location.controller';

const locationController = Container.get(LocationController);
const locationRouter = new Router({ prefix: '/locations' });

locationRouter.get('/', async (ctx) => {
  ctx.status = 200;
  ctx.body = await locationController.getLocations(ctx.query.page?.toString());
});

locationRouter.get('/:id', async (ctx) => {
  ctx.status = 200;
  ctx.body = await locationController.getLocation(ctx.params.id);
});

export default locationRouter;
