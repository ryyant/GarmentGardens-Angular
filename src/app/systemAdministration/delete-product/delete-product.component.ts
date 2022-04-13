import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';



@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit
{
  productId: string | null;
	productToDelete: Product;
	error: boolean;
	errorMessage: string | undefined;



  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              public sessionService: SessionService,
              private productService: ProductService)
  {
    this.productId = null;
    this.productToDelete = new Product();
		this.error = false;
  }



  ngOnInit(): void
  {
    this.checkAccessRight()

    this.productId = this.activatedRoute.snapshot.paramMap.get('productId');		
        
    if(this.productId != null)
    {
      this.productService.getProductByProductId(parseInt(this.productId)).subscribe({
        next:(response)=>{
          this.productToDelete = response;
          this.error = false;
        },
        error:(error)=>{
          this.error = true;
          this.errorMessage = error;
          this.productToDelete = new Product();
          console.log('********** DeleteProductComponent.ts: ' + error);
        }
      });          
    }
  }



  deleteProduct()
  {
    if(this.productId != null)
    {
      this.productService.deleteProduct(parseInt(this.productId)).subscribe({
        next:(response)=>{
          this.router.navigate(["/systemAdministration/viewAllProducts"]);
        },
        error:(error)=>{
          this.error = true;
					this.errorMessage = error;
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
