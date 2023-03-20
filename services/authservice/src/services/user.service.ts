import {injectable, BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {UserRepository} from '@sourceloop/authentication-service';
import {AppUser} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class UserService {
  constructor(
    @repository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  /*
   * Add service methods here
   */

  async createUser(user: AppUser) {
    const us: AppUser = new AppUser({
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });
    return await this.userRepository.create(us);
  }
}
