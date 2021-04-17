import fetch from 'node-fetch';
import { Singleton } from 'typescript-ioc';
import { boomify, internal } from 'boom';
import { IEpisodeGateway } from '../interfaces/episode.gateway.interface';

@Singleton
export default class EpisodeGateway implements IEpisodeGateway {
  public readonly apiUrl = process.env.RICK_AND_MORTY_API_URL!;

  async getEpisodes(page = '0'): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/episode?page=${page}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

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

  async getEpisode(id: string): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/episode/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

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
