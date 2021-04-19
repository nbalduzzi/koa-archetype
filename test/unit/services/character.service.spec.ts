import { expect } from 'chai';
import { SinonStubbedInstance, createStubInstance } from 'sinon';
import {
  ICharacter,
  ICharacterService,
} from '../../../src/interfaces/character.interface';
import { PagedResponse } from '../../../src/interfaces/pager.interface';
import CharacterGateway from '../../../src/gateways/character.gateway';
import CharacterService from '../../../src/services/character.service';
import CharacterMapper from '../../../src/gateways/mappers/character.mapper';
import {
  CharacterStatus,
  CharacterGender,
} from '../../../src/interfaces/character.gateway.interface';

describe('Character Service', () => {
  let gateway: SinonStubbedInstance<CharacterGateway>;
  let service: ICharacterService;

  before(() => {
    gateway = createStubInstance(CharacterGateway);
    service = new CharacterService(gateway, new CharacterMapper());
  });

  describe('on get character', () => {
    describe('on fetch api success', () => {
      it('should return the character', async () => {
        gateway.getCharacter.resolves({
          id: 1,
          name: 'Rick Sanchez',
          status: CharacterStatus.ALIVE,
          species: 'Human',
          type: '',
          gender: CharacterGender.MALE,
          origin: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/1',
          },
          location: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/20',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
          ],
          url: 'https://rickandmortyapi.com/api/character/1',
          created: '2017-11-04T18:48:46.250Z',
        });

        const character: ICharacter = await service.getCharacter(
          'someCharacterId',
        );

        expect(character.name).to.be.equals('Rick Sanchez');
        expect(character.species).to.be.equals('Human');
        expect(character.status).to.be.equals(CharacterStatus.ALIVE);
        expect(character.gender).to.be.equals(CharacterGender.MALE);
      });
    });

    describe('on fetch api fails', () => {
      it('should throw error', async () => {
        try {
          gateway.getCharacter.throws();
          await service.getCharacter('someCharacterId');
        } catch (e) {
          expect(e).to.not.be.undefined;
        }
      });
    });
  });

  describe('on get all paged character', () => {
    describe('on fetch api success', () => {
      describe('on fetch first page success', () => {
        it('should return the first page characters list', async () => {
          gateway.getCharacters.resolves({
            info: { count: 1, pages: 1, next: undefined, prev: undefined },
            results: [
              {
                id: 1,
                name: 'Rick Sanchez',
                status: CharacterStatus.ALIVE,
                species: 'Human',
                type: '',
                gender: CharacterGender.MALE,
                origin: {
                  name: 'Earth',
                  url: 'https://rickandmortyapi.com/api/location/1',
                },
                location: {
                  name: 'Earth',
                  url: 'https://rickandmortyapi.com/api/location/20',
                },
                image:
                  'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                episode: [
                  'https://rickandmortyapi.com/api/episode/1',
                  'https://rickandmortyapi.com/api/episode/2',
                ],
                url: 'https://rickandmortyapi.com/api/character/1',
                created: '2017-11-04T18:48:46.250Z',
              },
            ],
          });

          const characters: PagedResponse<ICharacter> = await service.getCharacters();

          expect(characters.info.count).to.be.equals(1);
          expect(characters.info.pages).to.be.equals(1);
          expect(characters.info.nextPage).to.be.undefined;
          expect(characters.info.prevPage).to.be.undefined;
          expect(characters.results.length).to.be.equals(1);
          expect(characters.results[0].name).to.be.equals('Rick Sanchez');
          expect(characters.results[0].species).to.be.equals('Human');
          expect(characters.results[0].gender).to.be.equals(
            CharacterGender.MALE,
          );
        });
      });

      describe('on fetch second page success', () => {
        it('should return the second page characters list', async () => {
          gateway.getCharacters.resolves({
            info: {
              count: 1,
              pages: 1,
              next: 'https://rickandmortyapi.com/api/character?page=2',
              prev: 'https://rickandmortyapi.com/api/character?page=1',
            },
            results: [
              {
                id: 1,
                name: 'Rick Sanchez',
                status: CharacterStatus.ALIVE,
                species: 'Human',
                type: '',
                gender: CharacterGender.MALE,
                origin: {
                  name: 'Earth',
                  url: 'https://rickandmortyapi.com/api/location/1',
                },
                location: {
                  name: 'Earth',
                  url: 'https://rickandmortyapi.com/api/location/20',
                },
                image:
                  'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                episode: [
                  'https://rickandmortyapi.com/api/episode/1',
                  'https://rickandmortyapi.com/api/episode/2',
                ],
                url: 'https://rickandmortyapi.com/api/character/1',
                created: '2017-11-04T18:48:46.250Z',
              },
            ],
          });

          const characters: PagedResponse<ICharacter> = await service.getCharacters();

          expect(characters.info.count).to.be.equals(1);
          expect(characters.info.pages).to.be.equals(1);
          expect(characters.info.nextPage).to.be.equals('2');
          expect(characters.info.prevPage).to.be.equals('1');
          expect(characters.results.length).to.be.equals(1);
          expect(characters.results[0].name).to.be.equals('Rick Sanchez');
          expect(characters.results[0].species).to.be.equals('Human');
          expect(characters.results[0].gender).to.be.equals(
            CharacterGender.MALE,
          );
        });
      });
    });

    describe('on fetch api fails', () => {
      it('should throw error', async () => {
        try {
          gateway.getCharacters.throws();
          await service.getCharacters();
        } catch (e) {
          expect(e).to.not.be.undefined;
        }
      });
    });
  });
});
