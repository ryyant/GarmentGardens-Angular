import { Advertisement } from "./advertisement";
import { CreditCard } from "./credit-card";

export class Advertiser {

    advertiserId: number | undefined;
    companyName: string | undefined;
    username: string | undefined;
    password: string | undefined;
    email: string | undefined;

    advertisements: Advertisement[] | undefined;
    creditCards: CreditCard[] | undefined;

    constructor(advertiserId?: number, companyName?: string, username?: string, password?: string, email?: string) {
        this.advertiserId = advertiserId;
        this.companyName = companyName;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
