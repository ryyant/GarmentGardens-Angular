import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-view-all-undergarments',
  templateUrl: './view-all-undergarments.component.html',
  styleUrls: ['./view-all-undergarments.component.css']
})
export class ViewAllUndergarmentsComponent implements OnInit 
{
  products: any[];
	display: boolean;
	productToView: Product;

  sortKey: string;
  
  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = "";

  dummyValue: number = 1;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private productService: ProductService,
    private primengConfig: PrimeNGConfig)
  {
    this.products = new Array();
    this.display = false;
		this.productToView = new Product();
  }

  ngOnInit(): void
  {
    this.checkAccessRight()

    this.productService.getFilteredProducts(3).subscribe({
      next:(response)=>{ for(let i=0;i<response.length;i++) {
        console.log(response[i].name)
      }
        this.products = response;
      },
      error:(error)=>{
        console.log('********** ViewAllProductsComponent.ts: ' + error);
      }
    });

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];

    this.primengConfig.ripple = true;
  }




  showDialog(productToView: Product)
	{
    this.display = true;
    this.productToView = productToView;
  }

  addToCart(productToView: Product)
	{
    this.display = true;
    this.productToView = productToView;
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
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

