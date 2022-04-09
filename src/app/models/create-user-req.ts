import { User } from '../models/user';



export class CreateUserReq
{
  userEntity: User | undefined;
  



  constructor(userEntity?: User)
  {		
    this.userEntity = userEntity;
  }
}