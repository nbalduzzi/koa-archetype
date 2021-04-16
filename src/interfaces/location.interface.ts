export interface ILocationController {
  getLocations(page?: string): Promise<PagedResponse<ILocation>>;
  getLocation(id: string): Promise<ILocation>;
}

export interface ILocationService {
  getLocations(page?: string): Promise<PagedResponse<ILocation>>;
  getLocation(id: string): Promise<ILocation>;
}

export interface ILocation {
  id: string;
  name: string;
  type: string;
  dimension: string;
  url: string;
  created: string;
}

export interface PagedResponse<T> {
  info: {
    count: number;
    pages: number;
    nextPage?: string;
    prevPage?: string;
  };
  results: T[];
}
