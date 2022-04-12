import { User } from '../models/user';

export class UpdateProfileReq {
  currentUser: User | undefined;

  constructor(currentUser?: User) {
    this.currentUser = currentUser;
  }
}
