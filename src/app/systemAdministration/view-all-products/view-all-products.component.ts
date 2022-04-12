import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.css']
})
export class ViewAllProductsComponent implements OnInit 
{
  products: Product[];
	display: boolean;
	productToView: Product;
  
  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;
  sortKey: string = "";
  sortField: string = "";

  qtyToAdd: number = 0;

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
    this.productService.getProducts().subscribe({
      next:(response)=>{ 
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

  viewProductDetails()
  {
    this.router.navigate(["/systemAdministration/viewProductDetails/" + this.productToView.productId]);
  }

  addToCart()
	{
    // CALL SERVICE HERE, TAKE IN qtyToAdd
  }

  onSortChange(event: { value: any; }) {
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

}

