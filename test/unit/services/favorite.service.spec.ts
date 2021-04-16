import { expect } from 'chai';
import { SinonStubbedInstance, createStubInstance } from 'sinon';
import {
  IFavorite,
  IFavoriteService,
} from '../../../src/interfaces/favorite.interface';
import FavoriteRepository from '../../../src/repositories/favorites/favorite.repository';
import FavoriteService from '../../../src/services/favorite.service';

describe('Favorite Service', () => {
  let repository: SinonStubbedInstance<FavoriteRepository>;
  let service: IFavoriteService;

  before(() => {
    repository = createStubInstance(FavoriteRepository);
    service = new FavoriteService(repository);
  });

  describe('on save user favorite', () => {
    describe('on no exists favorite before', () => {
      it('should save the favorite and return it', async () => {
        repository.saveFavorite.resolves({
          id: 'someFavoriteId',
          userId: 'someUserId',
          characterId: 'someCharacterId',
        });

        const favorite: IFavorite = await service.saveFavorite(
          'someUserId',
          'someCharacterId',
        );

        expect(favorite.userId).to.be.equals('someUserId');
        expect(favorite.characterId).to.be.equals('someCharacterId');
      });
    });

    describe('on exists favorite', () => {
      it('should throw `favorite already exists` error', async () => {
        repository.getFavorite.resolves({
          id: 'someFavoriteId',
          userId: 'someUserId',
          characterId: 'someCharacterId',
        });

        try {
          await service.saveFavorite('someUserId', 'someCharacterId');
        } catch (e) {
          expect(e.message).to.be.equals('favorite already exists');
        }
      });
    });
  });

  describe('on get user favorite', () => {
    describe('on favorite found', () => {
      it('should return the favorite', async () => {
        repository.getFavorite.resolves({
          id: 'someFavoriteId',
          userId: 'someUserId',
          characterId: 'someCharacterId',
        });

        const favorite: IFavorite = await service.getFavorite(
          'someUserId',
          'someCharacterId',
        );

        expect(favorite.userId).to.be.equals('someUserId');
        expect(favorite.characterId).to.be.equals('someCharacterId');
      });
    });

    describe('on favorite not found', () => {
      it('should return `favorite not found` error', async () => {
        repository.getFavorite.resolves(undefined);

        try {
          await service.getFavorite('someUserId', 'someCharacterId');
        } catch (e) {
          expect(e.message).to.be.equals('favorite not found');
        }
      });
    });
  });

  describe('on get all user favorites', () => {
    describe('on exist one favorite', () => {
      it('should return the favorites array', async () => {
        repository.getFavorites.resolves([
          {
            id: 'someFavoriteId',
            userId: 'someUserId',
            characterId: 'someCharacterId',
          },
        ]);

        const favorites: IFavorite[] = await service.getFavorites('someUserId');

        expect(favorites.length).to.be.equals(1);
        expect(favorites[0].userId).to.be.equals('someUserId');
        expect(favorites[0].characterId).to.be.equals('someCharacterId');
      });
    });

    describe('on exist favorites already', () => {
      it('should return empty array', async () => {
        repository.getFavorites.resolves([]);

        const favorites: IFavorite[] = await service.getFavorites('someUserId');

        expect(favorites).to.be.empty;
      });
    });
  });
});
