import { Inject, Singleton } from 'typescript-ioc';
import LocationGateway from '../gateways/location.gateway';
import LocationMapper from '../gateways/mappers/location.mapper';
import { ILocation, ILocationService } from '../interfaces/location.interface';
import { PagedResponse } from '../interfaces/pager.interface';

@Singleton
export default class LocationService implements ILocationService {
  constructor(
    @Inject private readonly locationGateway: LocationGateway,
    @Inject private readonly mapper: LocationMapper,
  ) {}

  async getLocations(page?: string): Promise<PagedResponse<ILocation>> {
    const response = await this.locationGateway.getLocations(page);
    return this.mapper.toPagedDTO(response);
  }

  async getLocation(id: string): Promise<ILocation> {
    const response = await this.locationGateway.getLocation(id);
    return this.mapper.toDTO(response);
  }
}
