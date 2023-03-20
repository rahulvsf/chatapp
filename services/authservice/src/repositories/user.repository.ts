import {inject} from '@loopback/core';
import {
  AnyObject,
  DataObject,
  DefaultCrudRepository,
  juggler,
} from '@loopback/repository';
import {AuthDbSourceName} from '@sourceloop/authentication-service';
import {User, UserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject(`datasources.${AuthDbSourceName}`) dataSource: juggler.DataSource,
  ) {
    super(User, dataSource);
  }

  async create(
    entity: DataObject<User>,
    options?: AnyObject | undefined,
  ): Promise<User> {
    return super.create(entity, options);
  }
}
