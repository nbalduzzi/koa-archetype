import { expect } from 'chai';
import { SinonStubbedInstance, createStubInstance } from 'sinon';
import {
  IEpisode,
  IEpisodeService,
  PagedResponse,
} from '../../../src/interfaces/episode.interface';
import EpisodeGateway from '../../../src/gateways/episode.gateway';
import EpisodeService from '../../../src/services/episode.service';
import EpisodeMapper from '../../../src/gateways/mappers/episode.mapper';

describe('Episode Service', () => {
  let gateway: SinonStubbedInstance<EpisodeGateway>;
  let service: IEpisodeService;

  before(() => {
    gateway = createStubInstance(EpisodeGateway);
    service = new EpisodeService(gateway, new EpisodeMapper());
  });

  describe('on get episode', () => {
    describe('on fetch api success', () => {
      it('should return the episode', async () => {
        gateway.getEpisode.resolves({
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

        const episode: IEpisode = await service.getEpisode('someEpisodeId');

        expect(episode.name).to.be.equals('The Ricklantis Mixup');
        expect(episode.airDate).to.be.equals('September 10, 2017');
        expect(episode.episode).to.be.equals('S03E07');
      });
    });

    describe('on fetch api fails', () => {
      it('should throw error', async () => {
        try {
          gateway.getEpisode.throws();
          await service.getEpisode('someEpisodeId');
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
          gateway.getEpisodes.resolves({
            info: { count: 1, pages: 1, next: undefined, prev: undefined },
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

          const episodes: PagedResponse<IEpisode> = await service.getEpisodes();

          expect(episodes.info.count).to.be.equals(1);
          expect(episodes.info.pages).to.be.equals(1);
          expect(episodes.info.nextPage).to.be.undefined;
          expect(episodes.info.prevPage).to.be.undefined;
          expect(episodes.results.length).to.be.equals(1);
          expect(episodes.results[0].name).to.be.equals('The Ricklantis Mixup');
          expect(episodes.results[0].airDate).to.be.equals(
            'September 10, 2017',
          );
          expect(episodes.results[0].episode).to.be.equals('S03E07');
        });
      });

      describe('on fetch second page success', () => {
        it('should return the second page episodes list', async () => {
          gateway.getEpisodes.resolves({
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

          const episodes: PagedResponse<IEpisode> = await service.getEpisodes();

          expect(episodes.info.count).to.be.equals(1);
          expect(episodes.info.pages).to.be.equals(1);
          expect(episodes.info.nextPage).to.be.equals('2');
          expect(episodes.info.prevPage).to.be.equals('1');
          expect(episodes.results.length).to.be.equals(1);
          expect(episodes.results[0].name).to.be.equals('The Ricklantis Mixup');
          expect(episodes.results[0].airDate).to.be.equals(
            'September 10, 2017',
          );
          expect(episodes.results[0].episode).to.be.equals('S03E07');
        });
      });
    });

    describe('on fetch api fails', () => {
      it('should throw error', async () => {
        try {
          gateway.getEpisodes.throws();
          await service.getEpisodes();
        } catch (e) {
          expect(e).to.not.be.undefined;
        }
      });
    });
  });
});
