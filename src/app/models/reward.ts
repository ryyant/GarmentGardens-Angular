import { User } from './user';
import { RewardEnum } from './reward-enum';
import { Staff } from './staff';

export class Reward {
    rewardId: number | undefined;
    rewardName: string | undefined;
    rewardEnum: RewardEnum | undefined;
    expiryDate: Date | undefined;

    customer: User | undefined;
    staff: Staff | undefined;

    constructor(rewardId?: number, rewardName?: string, rewardEnum?: RewardEnum, expiryDate?: Date)
	{
		this.rewardId = rewardId;		
		this.rewardName = rewardName;
		this.rewardEnum = rewardEnum;
		this.expiryDate = expiryDate;
	}

}
