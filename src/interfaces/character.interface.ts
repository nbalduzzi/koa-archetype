export interface ICharacterController {
  getCharacters(page?: string): Promise<PagedResponse<ICharacter>>;
  getCharacter(id: string): Promise<ICharacter>;
}

export interface ICharacterService {
  getCharacters(page?: string): Promise<PagedResponse<ICharacter>>;
  getCharacter(id: string): Promise<ICharacter>;
}

export interface ICharacter {
  id: string;
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

export interface PagedResponse<T> {
  info: {
    count: number;
    pages: number;
    nextPage?: string;
    prevPage?: string;
  };
  results: T[];
}
