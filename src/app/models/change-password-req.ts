import { User } from '../models/user';

export class ChangePasswordReq {
  currentUser: User | undefined;
  newPassword: string | undefined;

  constructor(currentUser?: User, newPassword?: string) {
    this.currentUser = currentUser;
    this.newPassword = newPassword;
  }
}
