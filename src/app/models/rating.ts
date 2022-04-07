import { Reward } from "./reward";

export class Rating {
    ratingId: number | undefined;
    description: String | undefined;
    numberOfStars: number | undefined;
    dateOfRating: Date | undefined;

    createdRewards: Reward[] | undefined;

    constructor(ratingId?: number, description?: string, numberOfStars?: number, dateOfRating?: Date)
	{
		this.ratingId = ratingId;		
		this.description = description;
		this.numberOfStars = numberOfStars;
		this.dateOfRating = dateOfRating;
	}


}
