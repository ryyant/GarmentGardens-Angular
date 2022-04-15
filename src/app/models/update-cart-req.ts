import { Product } from "./product";
import { User } from "./user";

export class UpdateCartReq {

    // FOR ADD TO CART
    productToAdd: Product | undefined;
    qtyToAdd: number | undefined;
    currentUser: User | undefined; // CUSTOMER

    // FOR CHECKOUT
    promoCode: string | undefined;

    // CAN ONLY HAVE 1 CONSTRUCTOR
    constructor(productToAdd?: Product, qtyToAdd?: number, promoCode?: string, currentUser?: User) {
        this.productToAdd = productToAdd;
        this.qtyToAdd = qtyToAdd;
        this.promoCode = promoCode;
        this.currentUser = currentUser;
    }
}
