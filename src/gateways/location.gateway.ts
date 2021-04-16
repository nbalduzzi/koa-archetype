import fetch from 'node-fetch';
import { InjectValue, Singleton } from 'typescript-ioc';
import { boomify, internal } from 'boom';
import { ILocationGateway } from '../interfaces/location.gateway.interface';

@Singleton
export default class LocationGateway implements ILocationGateway {
  constructor(
    @InjectValue(process.env.RICK_AND_MORTY_API_URL!)
    private readonly apiUrl?: string,
  ) {}

  async getLocations(page = '0'): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/location?page=${page}`, {
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

  async getLocation(id: string): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/location/${id}`, {
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
