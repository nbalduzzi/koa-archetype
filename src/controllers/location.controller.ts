import { Inject, Singleton } from 'typescript-ioc';
import {
  ILocation,
  ILocationController,
  PagedResponse,
} from '../interfaces/location.interface';
import LocationService from '../services/location.service';

@Singleton
export default class LocationController implements ILocationController {
  constructor(@Inject private readonly locationService: LocationService) {}

  async getLocations(page?: string): Promise<PagedResponse<ILocation>> {
    return await this.locationService.getLocations(page);
  }

  async getLocation(id: string): Promise<ILocation> {
    return await this.locationService.getLocation(id);
  }
}
