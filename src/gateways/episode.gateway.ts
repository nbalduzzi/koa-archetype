import fetch from 'node-fetch';
import { Singleton } from 'typescript-ioc';
import { boomify, internal } from 'boom';
import {
  IEpisodeApiResponse,
  IEpisodeGateway,
} from '../interfaces/episode.gateway.interface';
import { PagedApiResponse } from '../interfaces/pager.interface';

@Singleton
export default class EpisodeGateway implements IEpisodeGateway {
  async getEpisodes(
    page = '0',
  ): Promise<PagedApiResponse<IEpisodeApiResponse>> {
    try {
      const response = await fetch(
        `${process.env.RICK_AND_MORTY_API_URL!}/episode?page=${page}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response.ok) {
        throw boomify(new Error(response.statusText), {
          statusCode: response.status,
        });
      }

      return await response.json();
    } catch (e) {
      throw internal();
    }
  }

  async getEpisode(id: string): Promise<IEpisodeApiResponse> {
    try {
      const response = await fetch(
        `${process.env.RICK_AND_MORTY_API_URL!}/episode/${id}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response.ok) {
        throw boomify(new Error(response.statusText), {
          statusCode: response.status,
        });
      }

      return await response.json();
    } catch (e) {
      throw internal();
    }
  }
}
