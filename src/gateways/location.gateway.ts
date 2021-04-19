import fetch from 'node-fetch';
import { Singleton } from 'typescript-ioc';
import { boomify, internal } from 'boom';
import {
  ILocationApiResponse,
  ILocationGateway,
} from '../interfaces/location.gateway.interface';
import { PagedApiResponse } from '../interfaces/pager.interface';

@Singleton
export default class LocationGateway implements ILocationGateway {
  async getLocations(
    page = '0',
  ): Promise<PagedApiResponse<ILocationApiResponse>> {
    try {
      const response = await fetch(
        `${process.env.RICK_AND_MORTY_API_URL!}/location?page=${page}`,
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

  async getLocation(id: string): Promise<ILocationApiResponse> {
    try {
      const response = await fetch(
        `${process.env.RICK_AND_MORTY_API_URL!}/location/${id}`,
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
