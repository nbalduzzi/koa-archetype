import { Get, Query, Route, Security, Tags } from 'tsoa';
import { Inject, Singleton } from 'typescript-ioc';
import { IEpisode, IEpisodeController } from '../interfaces/episode.interface';
import { PagedResponse } from '../interfaces/pager.interface';
import EpisodeService from '../services/episode.service';

@Singleton
@Security('api_key')
@Route('episodes')
@Tags('episodes')
export default class EpisodeController implements IEpisodeController {
  constructor(@Inject private readonly episodeService: EpisodeService) {}

  @Get()
  async getEpisodes(@Query() page?: string): Promise<PagedResponse<IEpisode>> {
    return await this.episodeService.getEpisodes(page);
  }

  @Get('{id}')
  async getEpisode(id: string): Promise<IEpisode> {
    return await this.episodeService.getEpisode(id);
  }
}
