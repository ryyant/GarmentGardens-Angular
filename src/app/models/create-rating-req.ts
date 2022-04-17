import { LineItem } from "./line-item";
import { Order } from "./order";
import { Product } from "./product";
import { User } from "./user";
import { Rating } from "./rating";

export class CreateRatingReq {
    user: User | undefined;
    product: Product | undefined;
    newRating: Rating | undefined;
  
    constructor(user?: User, product?: Product, newRating?: Rating)
    {		
      this.user = user;
      this.product = product;
      this.newRating = newRating;
    }
  }