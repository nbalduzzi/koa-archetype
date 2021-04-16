export interface ILocationGateway {
  getLocations(page?: string): Promise<PagedApiResponse<ILocationApiResponse>>;
  getLocation(id: string): Promise<ILocationApiResponse>;
}

export interface PagedApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next?: string;
    prev?: string;
  };
  results: T[];
}

export interface ILocationApiResponse {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
