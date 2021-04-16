import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, connection } from 'mongoose';
import { IUser, UserStatus } from '../../../src/interfaces/user.interface';
import UserRepository from '../../../src/repositories/users/user.repository';
import { IUserRepository } from '../../../src/interfaces/user.interface';

describe('User Repository', () => {
  const mongod: MongoMemoryServer = new MongoMemoryServer();
  let repository: IUserRepository;

  beforeEach(async () => {
    const uri = await mongod.getUri();

    await connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    repository = new UserRepository();
  });

  afterEach(async () => {
    await connection.dropDatabase();
    await connection.close();
    await mongod.stop();
  });

  describe('on get user by username', () => {
    describe('on user found', () => {
      it('should return the user', async () => {
        await repository.saveUser('someUsername', 'somePassword');

        const user: IUser | undefined = await repository.getUserByUsername(
          'someUsername',
        );

        expect(user!.username).to.be.equals('someUsername');
        expect(user!.status).to.be.equals(UserStatus.OK);
      });
    });

    describe('on user not found', () => {
      it('should return undefined', async () => {
        const user: IUser | undefined = await repository.getUserByUsername('');
        expect(user).to.be.undefined;
      });
    });
  });

  describe('on save user', () => {
    describe('on no exist user before', () => {
      it('should return the user created', async () => {
        const user: IUser = await repository.saveUser(
          'someUsername',
          'somePassword',
        );

        expect(user!.username).to.be.equals('someUsername');
        expect(user!.status).to.be.equals(UserStatus.OK);
      });
    });

    describe('on exist user already', () => {
      it('should throw `user already exists` error', async () => {
        await repository.saveUser('someUsername', 'somePassword');

        try {
          await repository.saveUser('someUsername', 'somePassword');
        } catch (e) {
          expect(e).to.not.be.undefined;
        }
      });
    });
  });
});
