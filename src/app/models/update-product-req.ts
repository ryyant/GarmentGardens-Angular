import { Product } from '../models/product';



export class UpdateProductReq
{
  username: string | undefined;
  password: string | undefined;
  productEntity: Product | undefined;
  categoryId: number | undefined | null;
  tagIds: number[] | undefined;



  constructor(username?: string, password?: string, productEntity?: Product, categoryId?: number | undefined | null, tagIds?: number[])
  {		
    this.username = username;
    this.password = password;
    this.productEntity = productEntity;
    this.categoryId = categoryId;
    this.tagIds = tagIds;
  }
}