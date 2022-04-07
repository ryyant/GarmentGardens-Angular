import { Order } from "./order";
import { Staff } from "./staff";
import { DisputeStatusEnum } from "./dispute-status-enum";

export class Dispute {
    disputeId: number | undefined;
    title: string | undefined;
    description: string | undefined;
    disputeStatus: DisputeStatusEnum | undefined;

    staff: Staff | undefined;
    order: Order | undefined;

    constructor(disputeId?: number, title?: string, description?: string, disputeStatus?: DisputeStatusEnum) {
        this.disputeId = disputeId;
        this.title = title;
        this.description = description;
        this.disputeStatus = disputeStatus;
    }


}
