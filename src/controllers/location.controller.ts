import { Get, Query, Route, Security, Tags } from 'tsoa';
import { Inject, Singleton } from 'typescript-ioc';
import {
  ILocation,
  ILocationController,
} from '../interfaces/location.interface';
import { PagedResponse } from '../interfaces/pager.interface';
import LocationService from '../services/location.service';

@Singleton
@Security('api_key')
@Route('locations')
@Tags('locations')
export default class LocationController implements ILocationController {
  constructor(@Inject private readonly locationService: LocationService) {}

  @Get()
  async getLocations(
    @Query() page?: string,
  ): Promise<PagedResponse<ILocation>> {
    return await this.locationService.getLocations(page);
  }

  @Get('{id}')
  async getLocation(id: string): Promise<ILocation> {
    return await this.locationService.getLocation(id);
  }
}
