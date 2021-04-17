import fetch from 'node-fetch';
import { Singleton } from 'typescript-ioc';
import { boomify } from 'boom';
import {
  ICharacterApiResponse,
  ICharacterGateway,
  PagedApiResponse,
} from '../interfaces/character.gateway.interface';

@Singleton
export default class CharacterGateway implements ICharacterGateway {
  public readonly apiUrl = process.env.RICK_AND_MORTY_API_URL!;

  async getCharacters(
    page = '0',
  ): Promise<PagedApiResponse<ICharacterApiResponse>> {
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
  }

  async getCharacter(id: string): Promise<ICharacterApiResponse> {
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
  }
}
