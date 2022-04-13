import { Reward } from "./reward";
import { Staff } from "./staff";
import { User } from "./user";

export class UpdateRewardReq {

    reward: Reward | undefined;
    staff: Staff | undefined;
    customer: User | undefined;

    constructor(reward?: Reward, staff?: Staff, customer?: User) {
        this.reward = reward;
        this.staff = staff;
        this.customer = customer;
    }
    
}
