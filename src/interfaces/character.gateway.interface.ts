import { PagedApiResponse } from './pager.interface';

export interface ICharacterGateway {
  getCharacters(
    page?: string,
  ): Promise<PagedApiResponse<ICharacterApiResponse>>;
  getCharacter(id: string): Promise<ICharacterApiResponse>;
}

export interface ICharacterApiResponse {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: CharacterOrigin;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export enum CharacterStatus {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown',
}

export enum CharacterGender {
  FEMALE = 'Female',
  MALE = 'Male',
  GENDERLESS = 'Genderless',
  UNKNOWN = 'unknown',
}

export interface CharacterOrigin {
  name: string;
  url: string;
}

export interface CharacterLocation {
  name: string;
  url: string;
}
