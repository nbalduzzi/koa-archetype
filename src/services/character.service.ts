import { Inject, Singleton } from 'typescript-ioc';
import {
  ICharacter,
  ICharacterService,
} from '../interfaces/character.interface';
import { PagedResponse } from '../interfaces/pager.interface';
import CharacterGateway from '../gateways/character.gateway';
import CharacterMapper from '../gateways/mappers/character.mapper';

@Singleton
export default class CharacterService implements ICharacterService {
  constructor(
    @Inject private readonly characterGateway: CharacterGateway,
    @Inject private readonly mapper: CharacterMapper,
  ) {}

  async getCharacters(page?: string): Promise<PagedResponse<ICharacter>> {
    const response = await this.characterGateway.getCharacters(page);
    return this.mapper.toPagedDTO(response);
  }

  async getCharacter(id: string): Promise<ICharacter> {
    const response = await this.characterGateway.getCharacter(id);
    return this.mapper.toDTO(response);
  }
}
