import { expect } from 'chai';
import nock, { Scope } from 'nock';
import EpisodeGateway from '../../../src/gateways/episode.gateway';
import {
  IEpisodeGateway,
  IEpisodeApiResponse,
} from '../../../src/interfaces/episode.gateway.interface';
import { PagedApiResponse } from '../../../src/interfaces/pager.interface';

describe('Episode Gateway', () => {
  const apiUrl = 'http://some.url.com/api';

  let gateway: IEpisodeGateway;
  let nockScope: Scope;

  before(() => {
    nockScope = nock(apiUrl);
    process.env.RICK_AND_MORTY_API_URL = apiUrl;

    gateway = new EpisodeGateway();
  });

  after(() => nock.cleanAll());

  describe('on get episode', () => {
    describe('on fetch api success', () => {
      it('should return the episode', async () => {
        nockScope.get('/episode/28').reply(200, {
          id: 28,
          name: 'The Ricklantis Mixup',
          air_date: 'September 10, 2017',
          episode: 'S03E07',
          characters: [
            'https://rickandmortyapi.com/api/character/1',
            'https://rickandmortyapi.com/api/character/2',
          ],
          url: 'https://rickandmortyapi.com/api/episode/28',
          created: '2017-11-10T12:56:36.618Z',
        });

        const response: IEpisodeApiResponse = await gateway.getEpisode('28');

        expect(response.name).to.be.equals('The Ricklantis Mixup');
        expect(response.air_date).to.be.equals('September 10, 2017');
        expect(response.episode).to.be.equals('S03E07');
      });
    });

    describe('on fetch api fails', () => {
      it('should throw error', async () => {
        try {
          nockScope.get('/episode/28').reply(500);

          await gateway.getEpisode('28');
        } catch (e) {
          expect(e).to.not.be.undefined;
        }
      });
    });
  });

  describe('on get all paged episodes', () => {
    describe('on fetch api success', () => {
      describe('on fetch first page success', () => {
        it('should return the first page episodes list', async () => {
          nockScope.get('/episode?page=0').reply(200, {
            info: { count: 1, pages: 1, next: null, prev: null },
            results: [
              {
                id: 28,
                name: 'The Ricklantis Mixup',
                air_date: 'September 10, 2017',
                episode: 'S03E07',
                characters: [
                  'https://rickandmortyapi.com/api/character/1',
                  'https://rickandmortyapi.com/api/character/2',
                ],
                url: 'https://rickandmortyapi.com/api/episode/28',
                created: '2017-11-10T12:56:36.618Z',
              },
            ],
          });

          const response: PagedApiResponse<IEpisodeApiResponse> = await gateway.getEpisodes();

          expect(response.info.count).to.be.equals(1);
          expect(response.info.pages).to.be.equals(1);
          expect(response.info.next).to.be.null;
          expect(response.info.prev).to.be.null;
          expect(response.results.length).to.be.equals(1);
          expect(response.results[0].name).to.be.equals('The Ricklantis Mixup');
          expect(response.results[0].air_date).to.be.equals(
            'September 10, 2017',
          );
          expect(response.results[0].episode).to.be.equals('S03E07');
        });
      });

      describe('on fetch second page success', () => {
        it('should return the second page episodes list', async () => {
          nockScope.get('/episode?page=2').reply(200, {
            info: {
              count: 1,
              pages: 1,
              next: 'https://rickandmortyapi.com/api/episode?page=2',
              prev: 'https://rickandmortyapi.com/api/episode?page=1',
            },
            results: [
              {
                id: 28,
                name: 'The Ricklantis Mixup',
                air_date: 'September 10, 2017',
                episode: 'S03E07',
                characters: [
                  'https://rickandmortyapi.com/api/character/1',
                  'https://rickandmortyapi.com/api/character/2',
                ],
                url: 'https://rickandmortyapi.com/api/episode/28',
                created: '2017-11-10T12:56:36.618Z',
              },
            ],
          });

          const response: PagedApiResponse<IEpisodeApiResponse> = await gateway.getEpisodes(
            '2',
          );

          expect(response.info.count).to.be.equals(1);
          expect(response.info.pages).to.be.equals(1);
          expect(response.info.next).to.be.equals(
            'https://rickandmortyapi.com/api/episode?page=2',
          );
          expect(response.info.prev).to.be.equals(
            'https://rickandmortyapi.com/api/episode?page=1',
          );
          expect(response.results.length).to.be.equals(1);
          expect(response.results[0].name).to.be.equals('The Ricklantis Mixup');
          expect(response.results[0].air_date).to.be.equals(
            'September 10, 2017',
          );
          expect(response.results[0].episode).to.be.equals('S03E07');
        });
      });
    });

    describe('on fetch api fails', () => {
      it('should throw error', async () => {
        try {
          nockScope.get('/episode?page=0').reply(500);
          await gateway.getEpisodes();
        } catch (e) {
          expect(e).to.not.be.undefined;
        }
      });
    });
  });
});
