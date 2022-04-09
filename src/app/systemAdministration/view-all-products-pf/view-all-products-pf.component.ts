import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-view-all-products-pf',
  templateUrl: './view-all-products-pf.component.html',
  styleUrls: ['./view-all-products-pf.component.css']
})
export class ViewAllProductsPfComponent implements OnInit 
{
  products: Product[];
	display: boolean;
	productToView: Product;	

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private productService: ProductService)
  {
    this.products = new Array();
    this.display = false;
		this.productToView = new Product();
  }

  ngOnInit(): void
  {
    this.checkAccessRight()

    this.productService.getProducts().subscribe({
      next:(response)=>{
        this.products = response;
      },
      error:(error)=>{
        console.log('********** ViewAllProductsComponent.ts: ' + error);
      }
    });
  }



  showDialog(productToView: Product)
	{
    this.display = true;
    this.productToView = productToView;
  }



  checkAccessRight()
	{
		if(!this.sessionService.checkAccessRight(this.router.url))
		{
			this.router.navigate(["/accessRightError"]);
		}
	}
}
