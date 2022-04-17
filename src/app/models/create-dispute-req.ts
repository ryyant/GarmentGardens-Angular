import { Dispute } from "./dispute";

export class CreateDisputeReq {
  username: string | undefined;
  password: string | undefined;
  dispute: Dispute | undefined;
  orderId : string | undefined;
  title: string | undefined;
  description: string | undefined;

  constructor(username?: string, password?: string, dispute?: Dispute, orderId?: string, title?: string, description?: string)
  {		
    this.username = username;
    this.password = password;
    this.dispute = dispute;
    this.orderId = orderId;
    this.title = title;
    this.description = description;
  }
}
