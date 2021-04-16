import fetch from 'node-fetch';
import { InjectValue, Singleton } from 'typescript-ioc';
import { boomify, internal } from 'boom';
import {
  ICharacterApiResponse,
  ICharacterGateway,
  PagedApiResponse,
} from '../interfaces/character.gateway.interface';

@Singleton
export default class CharacterGateway implements ICharacterGateway {
  constructor(
    @InjectValue(process.env.RICK_AND_MORTY_API_URL!)
    private readonly apiUrl?: string,
  ) {}

  async getCharacters(
    page = '0',
  ): Promise<PagedApiResponse<ICharacterApiResponse>> {
    try {
      const response = await fetch(`${this.apiUrl}/character?page=${page}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000,
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

  async getCharacter(id: string): Promise<ICharacterApiResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/character/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000,
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
