import { PagedApiResponse } from './pager.interface';

export interface IEpisodeGateway {
  getEpisodes(page?: string): Promise<PagedApiResponse<IEpisodeApiResponse>>;
  getEpisode(id: string): Promise<IEpisodeApiResponse>;
}

export interface IEpisodeApiResponse {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
