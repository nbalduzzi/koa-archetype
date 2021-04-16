import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, connection } from 'mongoose';
import { IFavorite } from '../../../src/interfaces/favorite.interface';
import FavoriteRepository from '../../../src/repositories/favorites/favorite.repository';
import { IFavoriteRepository } from '../../../src/interfaces/favorite.interface';

describe('Favorite Repository', () => {
  const mongod: MongoMemoryServer = new MongoMemoryServer();
  let repository: IFavoriteRepository;

  beforeEach(async () => {
    const uri = await mongod.getUri();

    await connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    repository = new FavoriteRepository();
  });

  afterEach(async () => {
    await connection.dropDatabase();
    await connection.close();
    await mongod.stop();
  });

  describe('on save user favorite', () => {
    describe('on no exists favorite before', () => {
      it('should save the favorite and return it', async () => {
        const favorite: IFavorite = await repository.saveFavorite(
          'someUserId',
          'someCharacterId',
        );

        expect(favorite.userId).to.be.equals('someUserId');
        expect(favorite.characterId).to.be.equals('someCharacterId');
      });
    });

    describe('on exists favorite', () => {
      it('should throw `favorite already exists` error', async () => {
        await repository.saveFavorite('someUserId', 'someCharacterId');

        try {
          await repository.saveFavorite('someUserId', 'someCharacterId');
        } catch (e) {
          expect(e).to.not.be.undefined;
        }
      });
    });
  });

  describe('on get user favorite', () => {
    describe('on favorite found', () => {
      it('should return the favorite', async () => {
        await repository.saveFavorite('someUserId', 'someCharacterId');

        const favorite: IFavorite | undefined = await repository.getFavorite(
          'someUserId',
          'someCharacterId',
        );

        expect(favorite!.userId).to.be.equals('someUserId');
        expect(favorite!.characterId).to.be.equals('someCharacterId');
      });
    });

    describe('on favorite not found', () => {
      it('should return `favorite not found` error', async () => {
        const favorite: IFavorite | undefined = await repository.getFavorite(
          'someOtherUserId',
          'someOtherCharacterId',
        );

        expect(favorite).to.be.undefined;
      });
    });
  });

  describe('on get all user favorites', () => {
    describe('on exist one favorite', () => {
      it('should return the favorites array', async () => {
        await repository.saveFavorite('someUserId', 'someCharacterId');

        const favorites: IFavorite[] = await repository.getFavorites(
          'someUserId',
        );

        expect(favorites.length).to.be.equals(1);
        expect(favorites[0].userId).to.be.equals('someUserId');
        expect(favorites[0].characterId).to.be.equals('someCharacterId');
      });
    });

    describe('on exist favorites already', () => {
      it('should return empty array', async () => {
        const favorites: IFavorite[] = await repository.getFavorites(
          'someUserId',
        );

        expect(favorites).to.be.empty;
      });
    });
  });
});
