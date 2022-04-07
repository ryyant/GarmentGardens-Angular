import { User } from "./user";

export class CreditCard {

    creditCardId: number | undefined;
    holderName: String | undefined;
    creditCardNumber: string | undefined;
    cvv: String | undefined;
    expiryDate: Date | undefined;
    billingAddress: String | undefined;

    user: User | undefined;


    constructor(creditCardId?: number, holderName?: string, creditCardNumber?: string, cvv?: string, expiryDate?: Date, billingAddress?: string)
	{
		this.creditCardId = creditCardId;		
		this.holderName = holderName;
		this.creditCardNumber = creditCardNumber;
		this.cvv = cvv;
        this.expiryDate = expiryDate;
        this.billingAddress = billingAddress;
	}

}
