import { Singleton } from 'typescript-ioc';
import { IEpisodeApiResponse } from '../../interfaces/episode.gateway.interface';
import { IEpisode } from '../../interfaces/episode.interface';
import {
  PagedApiResponse,
  PagedResponse,
} from '../../interfaces/pager.interface';

@Singleton
export default class EpisodeMapper {
  toPagedDTO(
    data: PagedApiResponse<IEpisodeApiResponse>,
  ): PagedResponse<IEpisode> {
    return {
      info: {
        count: data.info.count,
        pages: data.info.pages,
        nextPage:
          data.info.next && new URL(data.info.next).searchParams.get('page')!,
        prevPage:
          data.info.prev && new URL(data.info.prev).searchParams.get('page')!,
      },
      results: data.results.map((item) => this.toDTO(item)),
    };
  }

  toDTO(item: IEpisodeApiResponse): IEpisode {
    return {
      id: item.id,
      name: item.name,
      airDate: item.air_date,
      episode: item.episode,
      url: item.url,
      created: item.created,
    };
  }
}
