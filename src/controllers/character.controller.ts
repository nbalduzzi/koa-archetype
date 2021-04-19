import { Get, Query, Route, Security, Tags } from 'tsoa';
import { Inject, Singleton } from 'typescript-ioc';
import {
  ICharacter,
  ICharacterController,
} from '../interfaces/character.interface';
import { PagedResponse } from '../interfaces/pager.interface';
import CharacterService from '../services/character.service';

@Singleton
@Security('api_key')
@Route('characters')
@Tags('characters')
export default class CharacterController implements ICharacterController {
  constructor(@Inject private readonly characterService: CharacterService) {}

  @Get()
  async getCharacters(
    @Query() page?: string,
  ): Promise<PagedResponse<ICharacter>> {
    return await this.characterService.getCharacters(page);
  }

  @Get('{id}')
  async getCharacter(id: string): Promise<ICharacter> {
    return await this.characterService.getCharacter(id);
  }
}
