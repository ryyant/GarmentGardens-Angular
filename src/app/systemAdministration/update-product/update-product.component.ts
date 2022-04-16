import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SessionService } from '../../services/session.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { TagService } from '../../services/tag.service';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { Tag } from '../../models/tag';



@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit
{
  submitted: boolean;
	productId: string | null;	
	productToUpdate: Product;
	retrieveProductError: boolean;
	
	categoryId: number | undefined | null;
	tagIds: string[];
	
	categories: Category[];
	tags: Tag[];
	
	error: boolean;
	showMessage: boolean;
	message: string;



  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              public sessionService: SessionService,
              private productService: ProductService,
              private categoryService: CategoryService,
				      private tagService: TagService)
  {
    this.productId = null;
		this.productToUpdate = new Product();
		this.categoryId = null;
		this.tagIds = new Array();
		this.categories = new Array();
		this.tags = new Array();

		this.submitted = false;
		this.retrieveProductError = false;
    this.error = false;
    this.showMessage = false;
    this.message = '';
  }



  ngOnInit(): void
  {
    this.checkAccessRight()

    this.productId = this.activatedRoute.snapshot.paramMap.get('productId');		
    
    if(this.productId != null)
    {
      this.productService.getProductByProductId(parseInt(this.productId)).subscribe({
        next:(response)=>{
          this.productToUpdate = response;
          
          if(this.productToUpdate.category != null)
          {
            this.categoryId = this.productToUpdate.category.categoryId;
          }
          
          this.tagIds = new Array();
          
          if(this.productToUpdate.tags != null)
          {
            for(var i = 0; i < this.productToUpdate.tags.length; i++)
            {					
              if(this.productToUpdate.tags[i].tagId != null)
              {
                let tagId:number | undefined = this.productToUpdate.tags[i].tagId

                if(tagId != null)
                {
                  this.tagIds.push(tagId.toString());	
                }
              }
            }
          }
        },
        error:(error)=>{
          this.retrieveProductError = true;
          console.log('********** ViewProductDetailsComponent.ts: ' + error);
        }
      });                              
      
      this.categoryService.getLeafCategories().subscribe({
        next:(response)=>{
          this.categories = response;
        },
        error:(error)=>{
          console.log('********** CreateNewProductComponent.ts: ' + error);
        }
      });				
      
      this.tagService.getTags().subscribe({
        next:(response)=>{
          this.tags = response;
        },
        error:(error)=>{
          console.log('********** CreateNewProductComponent.ts: ' + error);
        }
      });
    }
    
  }



  update(updateProductForm: NgForm)
  {		
    let longTagIds: number[] = new Array();
  
    for(var i = 0; i < this.tagIds.length; i++)
    {
      longTagIds.push(parseInt(this.tagIds[i]));
    }
    
    this.submitted = true;
    
    if (updateProductForm.valid) 
    {
      this.productService.updateProduct(this.productToUpdate, this.categoryId, longTagIds).subscribe({
        next:(response)=>{
          this.showMessage = true;
          this.error = false;
          this.message = "Product updated successfully";
        },
        error:(error)=>{
          this.showMessage = true;
          this.error = true;
          this.message = "An error has occurred while updating the product: " + error;
          
          console.log('********** UpdateProductComponent.ts: ' + error);
        }
      });        
    }
  }



  checkAccessRight()
  {
    if(!this.sessionService.checkAccessRight(this.router.url))
    {
      this.router.navigate(["/accessRightError"]);
    }
  }
}
