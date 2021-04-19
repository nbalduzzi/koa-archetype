import { PagedResponse } from './pager.interface';

export interface IEpisodeController {
  getEpisodes(page?: string): Promise<PagedResponse<IEpisode>>;
  getEpisode(id: string): Promise<IEpisode>;
}

export interface IEpisodeService {
  getEpisodes(page?: string): Promise<PagedResponse<IEpisode>>;
  getEpisode(id: string): Promise<IEpisode>;
}

export interface IEpisode {
  id: number;
  name: string;
  airDate: string;
  episode: string;
  url: string;
  created: string;
}
