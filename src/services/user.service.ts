import { Inject, Singleton } from 'typescript-ioc';
import { createHash } from 'crypto';
import { notFound, badRequest, forbidden } from 'boom';
import { IUser, IUserService, UserStatus } from '../interfaces/user.interface';
import UserRepository from '../repositories/users/user.repository';

@Singleton
export default class UserService implements IUserService {
  constructor(@Inject private readonly userRepository: UserRepository) {}

  async saveUser(username: string, password: string): Promise<IUser> {
    const user = await this.userRepository.getUserByUsername(username);
    if (user) throw badRequest('user already exists');

    const hashPassword = createHash('sha256').update(password).digest('hex');
    return await this.userRepository.saveUser(username, hashPassword);
  }

  async getUserByUsername(username: string): Promise<IUser> {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) throw notFound('user not found');

    return user;
  }

  async validateUserStatus(user: IUser): Promise<void> {
    if (user.status !== UserStatus.OK) {
      throw forbidden('user invalid status');
    }
  }
}
