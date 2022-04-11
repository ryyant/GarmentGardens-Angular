import { Advertiser } from "./advertiser";
import { Staff } from "./staff";

export class Advertisement {
    advertisementId: number | undefined;
    description: string | undefined;

    advertiser: Advertiser | undefined;
    approvedByStaff: Staff | undefined;


    constructor(advertisementId?: number, description?: string) {
        this.advertisementId = advertisementId;
        this.description = description;
    }
}
