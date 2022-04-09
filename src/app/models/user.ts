import { RoleEnum } from './role-enum';
import { TierEnum } from './tier-enum';
import { CreditCard } from './credit-card';
import { Cart } from './cart';
import { Order } from './order';
import { Reward } from './reward';

export class User
{
    userId: number | undefined;
	firstName: string | undefined;
	lastName: string | undefined;
	email: string | undefined;
	username: string | undefined;
	password: string | undefined;
    dateOfBirth: Date | undefined;
    address : String | undefined;
    role: RoleEnum | undefined;
    tiering: TierEnum | undefined;
    chlorophyll: number | undefined;
    wallet: number | undefined;

	rewards: Reward[] | undefined;
	creditCards: CreditCard[] | undefined;
	individualCart: Cart | undefined;
	groupCart: Cart | undefined;
	orders: Order[] | undefined;



    constructor(userId?: number, firstName?: string, lastName?: string, email?: string, username?: string, password?: string, dateOfBirth?: Date, address?: string, role?: RoleEnum, tiering?: TierEnum, chlorophyll?: number, wallet?: number)
	{
		this.userId = userId;		
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.username = username;
		this.password = password;
		this.dateOfBirth = dateOfBirth;
		this.address = address;
		this.role = role;
		this.tiering = tiering;
		this.chlorophyll = chlorophyll;
		this.wallet = wallet;
	}
}
