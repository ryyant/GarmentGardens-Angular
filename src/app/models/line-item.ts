import { Product } from "./product";

export class LineItem {
    lineItemId: number | undefined;
    serialNumber: number | undefined;
    quantity: number | undefined;
    unitPrice: number | undefined;
    subTotal: number | undefined;

    product: Product | undefined;

    constructor(lineItemId?: number, serialNumber?: number, quantity?: number, unitPrice?: number, subTotal?: number)
	{
		this.lineItemId = lineItemId;		
		this.serialNumber = serialNumber;
		this.quantity = quantity;
		this.unitPrice = unitPrice;
        this.subTotal = subTotal;
	}

}
