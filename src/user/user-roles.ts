import { RolesBuilder } from 'nest-access-control';

export enum UserRoles {
  Admin = 'Admin',
  General = 'General',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(UserRoles.General)
  .readAny(['post'])
  .grant(UserRoles.Admin)
  .extend(UserRoles.General)
  .createAny(['post'])
  .updateAny(['post'])
  .deleteAny(['post']);
