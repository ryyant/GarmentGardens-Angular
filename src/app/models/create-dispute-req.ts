import { Dispute } from "./dispute";

export class CreateDisputeReq {
  username: string | undefined;
  password: string | undefined;
  disputeEntity: Dispute | undefined;
  orderId : string | undefined;

  constructor(username?: string, password?: string, disputeEntity?: Dispute, orderId?: string)
  {		
    this.username = username;
    this.password = password;
    this.disputeEntity = disputeEntity;
    this.orderId = orderId;
  }
}
