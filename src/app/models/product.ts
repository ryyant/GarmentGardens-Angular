import { Category } from './category';
import { Tag } from './tag';
import { Rating } from './rating';
import { LineItem } from './line-item';
import { User } from './user';



export class Product
{
  productId: number | undefined;
  skuCode: string | undefined;
  name: string | undefined;
  description: string | undefined;
  quantityOnHand: number | undefined;
  unitPrice: number | undefined;
  isListed: boolean | undefined;
  imageLink: string | undefined;	
  
  productRating: Rating[] | undefined;
  category: Category | undefined;
  tags: Tag[] | undefined;
  lineItem: LineItem | undefined;
  seller: User | undefined;



  constructor(productId?: number, skuCode?: string, name?: string, description?: string, quantityOnHand?: number, unitPrice?: number, imageLink?: string)
  {
    this.productId = productId;
    this.skuCode = skuCode;
    this.name = name;
    this.description = description;
    this.quantityOnHand = quantityOnHand;
    this.isListed = true;
    this.unitPrice = unitPrice;	
    this.imageLink = imageLink;	
  }
}
