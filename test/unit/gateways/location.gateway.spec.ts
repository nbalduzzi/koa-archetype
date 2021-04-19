import { expect } from 'chai';
import nock, { Scope } from 'nock';
import LocationGateway from '../../../src/gateways/location.gateway';
import {
  ILocationGateway,
  ILocationApiResponse,
} from '../../../src/interfaces/location.gateway.interface';
import { PagedApiResponse } from '../../../src/interfaces/pager.interface';

describe('Location Gateway', () => {
  const apiUrl = 'http://some.url.com/api';

  let gateway: ILocationGateway;
  let nockScope: Scope;

  before(() => {
    nockScope = nock(apiUrl);
    process.env.RICK_AND_MORTY_API_URL = apiUrl;

    gateway = new LocationGateway();
  });

  after(() => nock.cleanAll());

  describe('on get location', () => {
    describe('on fetch api success', () => {
      it('should return the location', async () => {
        nockScope.get('/location/3').reply(200, {
          id: 3,
          name: 'Citadel of Ricks',
          type: 'Space station',
          dimension: 'unknown',
          residents: [
            'https://rickandmortyapi.com/api/character/8',
            'https://rickandmortyapi.com/api/character/14',
          ],
          url: 'https://rickandmortyapi.com/api/location/3',
          created: '2017-11-10T13:08:13.191Z',
        });

        const response: ILocationApiResponse = await gateway.getLocation('3');

        expect(response.name).to.be.equals('Citadel of Ricks');
        expect(response.type).to.be.equals('Space station');
        expect(response.dimension).to.be.equals('unknown');
      });
    });

    describe('on fetch api fails', () => {
      it('should throw error', async () => {
        try {
          nockScope.get('/location/3').reply(500);

          await gateway.getLocation('3');
        } catch (e) {
          expect(e).to.not.be.undefined;
        }
      });
    });
  });

  describe('on get all paged locations', () => {
    describe('on fetch api success', () => {
      describe('on fetch first page success', () => {
        it('should return the first page locations list', async () => {
          nockScope.get('/location?page=0').reply(200, {
            info: { count: 1, pages: 1, next: null, prev: null },
            results: [
              {
                id: 3,
                name: 'Citadel of Ricks',
                type: 'Space station',
                dimension: 'unknown',
                residents: [
                  'https://rickandmortyapi.com/api/character/8',
                  'https://rickandmortyapi.com/api/character/14',
                ],
                url: 'https://rickandmortyapi.com/api/location/3',
                created: '2017-11-10T13:08:13.191Z',
              },
            ],
          });

          const response: PagedApiResponse<ILocationApiResponse> = await gateway.getLocations();

          expect(response.info.count).to.be.equals(1);
          expect(response.info.pages).to.be.equals(1);
          expect(response.info.next).to.be.null;
          expect(response.info.prev).to.be.null;
          expect(response.results.length).to.be.equals(1);
          expect(response.results[0].name).to.be.equals('Citadel of Ricks');
          expect(response.results[0].type).to.be.equals('Space station');
          expect(response.results[0].dimension).to.be.equals('unknown');
        });
      });

      describe('on fetch second page success', () => {
        it('should return the second page locations list', async () => {
          nockScope.get('/location?page=2').reply(200, {
            info: {
              count: 1,
              pages: 1,
              next: 'https://rickandmortyapi.com/api/location?page=2',
              prev: 'https://rickandmortyapi.com/api/location?page=1',
            },
            results: [
              {
                id: 3,
                name: 'Citadel of Ricks',
                type: 'Space station',
                dimension: 'unknown',
                residents: [
                  'https://rickandmortyapi.com/api/character/8',
                  'https://rickandmortyapi.com/api/character/14',
                ],
                url: 'https://rickandmortyapi.com/api/location/3',
                created: '2017-11-10T13:08:13.191Z',
              },
            ],
          });

          const response: PagedApiResponse<ILocationApiResponse> = await gateway.getLocations(
            '2',
          );

          expect(response.info.count).to.be.equals(1);
          expect(response.info.pages).to.be.equals(1);
          expect(response.info.next).to.be.equals(
            'https://rickandmortyapi.com/api/location?page=2',
          );
          expect(response.info.prev).to.be.equals(
            'https://rickandmortyapi.com/api/location?page=1',
          );
          expect(response.results.length).to.be.equals(1);
          expect(response.results[0].name).to.be.equals('Citadel of Ricks');
          expect(response.results[0].type).to.be.equals('Space station');
          expect(response.results[0].dimension).to.be.equals('unknown');
        });
      });
    });

    describe('on fetch api fails', () => {
      it('should throw error', async () => {
        try {
          nockScope.get('/location?page=0').reply(500);
          await gateway.getLocations();
        } catch (e) {
          expect(e).to.not.be.undefined;
        }
      });
    });
  });
});
