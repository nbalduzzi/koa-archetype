export interface IEpisodeController {
  getEpisodes(page?: string): Promise<PagedResponse<IEpisode>>;
  getEpisode(id: string): Promise<IEpisode>;
}

export interface IEpisodeService {
  getEpisodes(page?: string): Promise<PagedResponse<IEpisode>>;
  getEpisode(id: string): Promise<IEpisode>;
}

export interface IEpisode {
  id: string;
  name: string;
  airDate: string;
  episode: string;
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
