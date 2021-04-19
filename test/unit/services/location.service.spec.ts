import { expect } from 'chai';
import { SinonStubbedInstance, createStubInstance } from 'sinon';
import {
  ILocation,
  ILocationService,
} from '../../../src/interfaces/location.interface';
import { PagedResponse } from '../../../src/interfaces/pager.interface';
import LocationGateway from '../../../src/gateways/location.gateway';
import LocationService from '../../../src/services/location.service';
import LocationMapper from '../../../src/gateways/mappers/location.mapper';

describe('Location Service', () => {
  let gateway: SinonStubbedInstance<LocationGateway>;
  let service: ILocationService;

  before(() => {
    gateway = createStubInstance(LocationGateway);
    service = new LocationService(gateway, new LocationMapper());
  });

  describe('on get location', () => {
    describe('on fetch api success', () => {
      it('should return the location', async () => {
        gateway.getLocation.resolves({
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

        const location: ILocation = await service.getLocation('someLocationId');

        expect(location.name).to.be.equals('Citadel of Ricks');
        expect(location.type).to.be.equals('Space station');
        expect(location.dimension).to.be.equals('unknown');
      });
    });

    describe('on fetch api fails', () => {
      it('should throw error', async () => {
        try {
          gateway.getLocation.throws();
          await service.getLocation('someLocationId');
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
          gateway.getLocations.resolves({
            info: { count: 1, pages: 1, next: undefined, prev: undefined },
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

          const locations: PagedResponse<ILocation> = await service.getLocations();

          expect(locations.info.count).to.be.equals(1);
          expect(locations.info.pages).to.be.equals(1);
          expect(locations.info.nextPage).to.be.undefined;
          expect(locations.info.prevPage).to.be.undefined;
          expect(locations.results.length).to.be.equals(1);
          expect(locations.results[0].name).to.be.equals('Citadel of Ricks');
          expect(locations.results[0].type).to.be.equals('Space station');
          expect(locations.results[0].dimension).to.be.equals('unknown');
        });
      });

      describe('on fetch second page success', () => {
        it('should return the second page locations list', async () => {
          gateway.getLocations.resolves({
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

          const locations: PagedResponse<ILocation> = await service.getLocations();

          expect(locations.info.count).to.be.equals(1);
          expect(locations.info.pages).to.be.equals(1);
          expect(locations.info.nextPage).to.be.equals('2');
          expect(locations.info.prevPage).to.be.equals('1');
          expect(locations.results.length).to.be.equals(1);
          expect(locations.results[0].name).to.be.equals('Citadel of Ricks');
          expect(locations.results[0].type).to.be.equals('Space station');
          expect(locations.results[0].dimension).to.be.equals('unknown');
        });
      });
    });

    describe('on fetch api fails', () => {
      it('should throw error', async () => {
        try {
          gateway.getLocations.throws();
          await service.getLocations();
        } catch (e) {
          expect(e).to.not.be.undefined;
        }
      });
    });
  });
});
