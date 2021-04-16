import { Inject, Singleton } from 'typescript-ioc';
import {
  IEpisode,
  IEpisodeController,
  PagedResponse,
} from '../interfaces/episode.interface';
import EpisodeService from '../services/episode.service';

@Singleton
export default class EpisodeController implements IEpisodeController {
  constructor(@Inject private readonly episodeService: EpisodeService) {}

  async getEpisodes(page?: string): Promise<PagedResponse<IEpisode>> {
    return await this.episodeService.getEpisodes(page);
  }

  async getEpisode(id: string): Promise<IEpisode> {
    return await this.episodeService.getEpisode(id);
  }
}
