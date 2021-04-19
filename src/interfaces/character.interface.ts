import { PagedResponse } from './pager.interface';

export interface ICharacterController {
  getCharacters(page?: string): Promise<PagedResponse<ICharacter>>;
  getCharacter(id: string): Promise<ICharacter>;
}

export interface ICharacterService {
  getCharacters(page?: string): Promise<PagedResponse<ICharacter>>;
  getCharacter(id: string): Promise<ICharacter>;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: string;
  location: string;
  image: string;
  created: string;
}
