import { PagedResponse } from './pager.interface';

export interface ILocationController {
  getLocations(page?: string): Promise<PagedResponse<ILocation>>;
  getLocation(id: string): Promise<ILocation>;
}

export interface ILocationService {
  getLocations(page?: string): Promise<PagedResponse<ILocation>>;
  getLocation(id: string): Promise<ILocation>;
}

export interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  url: string;
  created: string;
}
