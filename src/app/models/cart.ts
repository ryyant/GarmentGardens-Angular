import { CartTypeEnum } from "./cart-type-enum";
import { User } from "./user";
import { LineItem } from "./line-item";

export class Cart {

    cartId: number | undefined;
    totalCartItems: number | undefined;
    totalQuantity: number | undefined;
    totalAmount: number | undefined;
    cartType: CartTypeEnum | undefined;

    cartLineItems: LineItem[] | undefined;
    groupCustomers: User[] | undefined;
    customer: User | undefined;

    constructor(cartId?: number, totalCartItems?: number, totalQuantity?: number, totalAmount?: number, cartType?: CartTypeEnum)
	{
		this.cartId = cartId;		
		this.totalCartItems = totalCartItems;
		this.totalQuantity = totalQuantity;
		this.totalAmount = totalAmount;
        this.cartType = cartType;
	}

}
