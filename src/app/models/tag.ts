import { Product } from './product';

export class Tag 
{
  tagId: number | undefined;
  name: string | undefined;

  productEntities: Product[] | undefined;



  constructor(tagId?: number, name?: string)
  {
    this.tagId = tagId;
    this.name = name;
  }
}