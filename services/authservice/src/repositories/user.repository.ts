import {inject} from '@loopback/core';
import {
  AnyObject,
  DataObject,
  DefaultCrudRepository,
  juggler,
} from '@loopback/repository';
import {AuthDbSourceName} from '@sourceloop/authentication-service';
import {AppUser, AppUserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  AppUser,
  typeof AppUser.prototype.id,
  AppUserRelations
> {
  constructor(
    @inject(`datasources.${AuthDbSourceName}`) dataSource: juggler.DataSource,
  ) {
    super(AppUser, dataSource);
  }

  async create(
    entity: DataObject<AppUser>,
    options?: AnyObject | undefined,
  ): Promise<AppUser> {
    return super.create(entity, options);
  }
}
