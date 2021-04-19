import { Singleton } from 'typescript-ioc';
import { ILocationApiResponse } from '../../interfaces/location.gateway.interface';
import { ILocation } from '../../interfaces/location.interface';
import {
  PagedApiResponse,
  PagedResponse,
} from '../../interfaces/pager.interface';

@Singleton
export default class LocationMapper {
  toPagedDTO(
    data: PagedApiResponse<ILocationApiResponse>,
  ): PagedResponse<ILocation> {
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

  toDTO(item: ILocationApiResponse): ILocation {
    return {
      id: item.id,
      name: item.name,
      type: item.type,
      dimension: item.dimension,
      url: item.url,
      created: item.created,
    };
  }
}
