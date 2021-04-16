import { Singleton } from 'typescript-ioc';
import { v4 } from 'uuid';
import {
  IUser,
  IUserRepository,
  UserStatus,
} from '../../interfaces/user.interface';
import { UserModel } from './user.model';

@Singleton
export default class UserRepository implements IUserRepository {
  async saveUser(username: string, password: string): Promise<IUser> {
    const doc = await UserModel.create({
      id: v4(),
      username,
      password,
      status: UserStatus.OK,
      lastConnection: new Date().toISOString(),
    });

    return doc.toJSON();
  }

  async getUserByUsername(username: string): Promise<IUser | undefined> {
    const doc = await UserModel.findOne({ username });
    return doc?.toJSON();
  }
}
