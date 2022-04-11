import { Advertiser } from "./advertiser";
import { User } from "./user";


export class UpdateCreditCardReq {

    username: string | undefined;
    password: string | undefined;

    holderName: string | undefined;
    creditCardNumber: string | undefined;
    cvv: string | undefined;
    expiryDate: Date | undefined;
    billingAddress: string | undefined;

    user: User | undefined;
    advertiser: Advertiser | undefined;

    constructor(username?: string, password?: string, holderName?: string, creditCardNumber?: string, cvv?: string, expiryDate?: Date, billingAddress?: string, user?: User, advertiser?: Advertiser) {
        this.username = username;
        this.password = password;
        this.holderName = holderName;
        this.creditCardNumber = creditCardNumber;
        this.cvv = cvv;
        this.expiryDate = expiryDate;
        this.billingAddress = billingAddress;
        this.user = user;
        this.advertiser = advertiser;
    }
}
