import { Product } from "./product";
import { User } from "./user";

export class UpdateCartReq {

    productToAdd: Product | undefined;
    qtyToAdd: number | undefined;
    currentUser: User | undefined; // CUSTOMER

    constructor(productToAdd?: Product, qtyToAdd?: number, currentUser?: User) {
        this.productToAdd = productToAdd;
        this.qtyToAdd = qtyToAdd;
        this.currentUser = currentUser;
    }
    
}
