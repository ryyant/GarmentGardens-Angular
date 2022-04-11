import { User } from '../models/user';

export class UpdateUserReq {
  userEntity: User | undefined;

  constructor(userEntity?: User) {
    this.userEntity = userEntity;
  }
}
