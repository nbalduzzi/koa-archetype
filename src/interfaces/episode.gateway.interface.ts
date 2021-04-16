export interface IEpisodeGateway {
  getEpisodes(page?: string): Promise<PagedApiResponse<IEpisodeApiResponse>>;
  getEpisode(id: string): Promise<IEpisodeApiResponse>;
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

export interface IEpisodeApiResponse {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
