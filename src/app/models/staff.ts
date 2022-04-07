import { AccessRightEnum } from './access-right-enum';
import { Reward } from './reward';



export class Staff
{
    staffId: number | undefined;
	firstName: string | undefined;
	lastName: string | undefined;
	accessRightEnum: AccessRightEnum | undefined;
	username: string | undefined;
	password: string | undefined;

    createdRewards: Reward[] | undefined



    constructor(staffId?: number, firstName?: string, lastName?: string, accessRightEnum?: AccessRightEnum, username?: string, password?: string)
	{
		this.staffId = staffId;		
		this.firstName = firstName;
		this.lastName = lastName;
		this.accessRightEnum = accessRightEnum;
		this.username = username;
		this.password = password;
	}
}