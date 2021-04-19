import { PagedApiResponse } from './pager.interface';

export interface ILocationGateway {
  getLocations(page?: string): Promise<PagedApiResponse<ILocationApiResponse>>;
  getLocation(id: string): Promise<ILocationApiResponse>;
}

export interface ILocationApiResponse {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
