import { Singleton } from 'typescript-ioc';
import {
  ICharacterApiResponse,
  PagedApiResponse,
} from '../../interfaces/character.gateway.interface';
import {
  ICharacter,
  PagedResponse,
} from '../../interfaces/character.interface';

@Singleton
export default class CharacterMapper {
  toPagedDTO(
    data: PagedApiResponse<ICharacterApiResponse>,
  ): PagedResponse<ICharacter> {
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

  toDTO(data: ICharacterApiResponse): ICharacter {
    return {
      id: data.id.toString(),
      name: data.name,
      status: data.status.toString(),
      species: data.species,
      type: data.type,
      gender: data.gender,
      origin: data.origin.name,
      location: data.location.name,
      image: data.image,
      created: data.created,
    };
  }
}
