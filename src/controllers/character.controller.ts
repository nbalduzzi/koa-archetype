import { Inject, Singleton } from 'typescript-ioc';
import {
  ICharacter,
  ICharacterController,
  PagedResponse,
} from '../interfaces/character.interface';
import CharacterService from '../services/character.service';

@Singleton
export default class CharacterController implements ICharacterController {
  constructor(@Inject private readonly characterService: CharacterService) {}

  async getCharacters(page?: string): Promise<PagedResponse<ICharacter>> {
    return await this.characterService.getCharacters(page);
  }

  async getCharacter(id: string): Promise<ICharacter> {
    return await this.characterService.getCharacter(id);
  }
}
