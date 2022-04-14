import { Advertiser } from './advertiser';
import { User } from './user';
import { CreditCard } from './credit-card';

export class CreateCreditCardReq {
  newCC: CreditCard | undefined;
  username: string | undefined;
  password: string | undefined;

  constructor(newCC?: CreditCard, username?: string, password?: string) {
    this.newCC = newCC;
    this.username = username;
    this.password = password;
  }
}
