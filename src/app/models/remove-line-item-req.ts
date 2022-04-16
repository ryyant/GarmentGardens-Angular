import { LineItem } from "./line-item";
import { Product } from "./product";
import { User } from "./user";

export class RemoveLineItemReq {

    // FOR REMOVE LINE ITEM
    lineItemToRemove: LineItem | undefined;
    currentUser: User | undefined; // CUSTOMER

    // FOR CLEAR CART
    clearCart: boolean | undefined;

    // CAN ONLY HAVE 1 CONSTRUCTOR
    constructor(lineItemToRemove?: LineItem, currentUser?: User, clearCart?: boolean) {
        this.lineItemToRemove = lineItemToRemove;
        this.currentUser = currentUser;
        this.clearCart = clearCart;
    }
}
