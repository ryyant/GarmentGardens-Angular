import { User } from "./user";
import { LineItem } from "./line-item";
import { DeliveryStatusEnum } from "./delivery-status-enum";
import { Dispute } from "./dispute";

export class Order {

    orderId: number | undefined;
    totalOrderItem: number | undefined;
    totalQuantity: number | undefined;
    totalAmount: number | undefined;
    transactionDateTime: Date | undefined;
    voidRefund: boolean | undefined;
    deliveryStatus: DeliveryStatusEnum | undefined;

    lineItems: LineItem[] | undefined;
    dispute: Dispute | undefined;
    customer: User | undefined;

    constructor(orderId?: number, totalOrderItem?: number, totalQuantity?: number, totalAmount?: number, transactionDateTime?: Date, voidRefund?: boolean, deliveryStatus?: DeliveryStatusEnum)
	{
		this.orderId = orderId;
		this.totalOrderItem = totalOrderItem;
		this.totalQuantity = totalQuantity;
        this.totalAmount = totalAmount;
        this.transactionDateTime = transactionDateTime;
        this.voidRefund = voidRefund;
        this.deliveryStatus = deliveryStatus

	}

}
