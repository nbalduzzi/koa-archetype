import { expect } from 'chai';
import nock, { Scope } from 'nock';
import CharacterGateway from '../../../src/gateways/character.gateway';
import {
  CharacterStatus,
  CharacterGender,
  ICharacterGateway,
  ICharacterApiResponse,
  PagedApiResponse,
} from '../../../src/interfaces/character.gateway.interface';

describe('Character Gateway', () => {
  const apiUrl = 'http://some.url.com/api';

  let gateway: ICharacterGateway;
  let nockScope: Scope;

  before(() => {
    nockScope = nock(apiUrl);
    process.env.RICK_AND_MORTY_API_URL = apiUrl;

    gateway = new CharacterGateway();
  });

  after(() => nock.cleanAll());

  describe('on get character', () => {
    describe('on fetch api success', () => {
      it('should return the character', async () => {
        nockScope.get('/character/1').reply(200, {
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

        const response: ICharacterApiResponse = await gateway.getCharacter('1');

        expect(response.name).to.be.equals('Rick Sanchez');
        expect(response.species).to.be.equals('Human');
        expect(response.status).to.be.equals(CharacterStatus.ALIVE);
        expect(response.gender).to.be.equals(CharacterGender.MALE);
      });
    });

    describe('on fetch api fails', () => {
      it('should throw error', async () => {
        try {
          nockScope.get('/character/1').reply(500);

          await gateway.getCharacter('1');
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
          nockScope.get('/character?page=0').reply(200, {
            info: { count: 1, pages: 1, next: null, prev: null },
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

          const response: PagedApiResponse<ICharacterApiResponse> = await gateway.getCharacters();

          expect(response.info.count).to.be.equals(1);
          expect(response.info.pages).to.be.equals(1);
          expect(response.info.next).to.be.null;
          expect(response.info.prev).to.be.null;
          expect(response.results.length).to.be.equals(1);
          expect(response.results[0].name).to.be.equals('Rick Sanchez');
          expect(response.results[0].species).to.be.equals('Human');
          expect(response.results[0].gender).to.be.equals(CharacterGender.MALE);
        });
      });

      describe('on fetch second page success', () => {
        it('should return the second page characters list', async () => {
          nockScope.get('/character?page=2').reply(200, {
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

          const response: PagedApiResponse<ICharacterApiResponse> = await gateway.getCharacters(
            '2',
          );

          expect(response.info.count).to.be.equals(1);
          expect(response.info.pages).to.be.equals(1);
          expect(response.info.next).to.be.equals(
            'https://rickandmortyapi.com/api/character?page=2',
          );
          expect(response.info.prev).to.be.equals(
            'https://rickandmortyapi.com/api/character?page=1',
          );
          expect(response.results.length).to.be.equals(1);
          expect(response.results[0].name).to.be.equals('Rick Sanchez');
          expect(response.results[0].species).to.be.equals('Human');
          expect(response.results[0].gender).to.be.equals(CharacterGender.MALE);
        });
      });
    });

    describe('on fetch api fails', () => {
      it('should throw error', async () => {
        try {
          nockScope.get('/character?page=0').reply(500);
          await gateway.getCharacters();
        } catch (e) {
          expect(e).to.not.be.undefined;
        }
      });
    });
  });
});
