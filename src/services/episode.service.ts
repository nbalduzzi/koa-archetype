import { Inject, Singleton } from 'typescript-ioc';
import { IEpisode, IEpisodeService } from '../interfaces/episode.interface';
import EpisodeGateway from '../gateways/episode.gateway';
import EpisodeMapper from '../gateways/mappers/episode.mapper';
import { PagedResponse } from '../interfaces/pager.interface';

@Singleton
export default class EpisodeService implements IEpisodeService {
  constructor(
    @Inject private readonly episodeGateway: EpisodeGateway,
    @Inject private readonly mapper: EpisodeMapper,
  ) {}

  async getEpisodes(page?: string): Promise<PagedResponse<IEpisode>> {
    const response = await this.episodeGateway.getEpisodes(page);
    return this.mapper.toPagedDTO(response);
  }

  async getEpisode(id: string): Promise<IEpisode> {
    const response = await this.episodeGateway.getEpisode(id);
    return this.mapper.toDTO(response);
  }
}
