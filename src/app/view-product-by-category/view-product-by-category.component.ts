import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { SessionService } from '../services/session.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product'

import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-view-product-by-category',
  templateUrl: './view-product-by-category.component.html',
  styleUrls: ['./view-product-by-category.component.css']
})
export class ViewProductByCategoryComponent implements OnInit {
  products: Product[];
	display: boolean;
	productToView: Product;
  
  categoryId: string | null;


  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;
  sortKey: string = "";
  sortField: string = "";

  dummyValue: number = 1;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private productService: ProductService,
    private primengConfig: PrimeNGConfig)
  {
    this.products = new Array();
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('categoryId');
    this.display = false;
		this.productToView = new Product();
  }

  ngOnInit(): void
  {

    // IMPORTANT FOR SAME ROUTE, DYNAMIC CHANGE
    this.router.events.subscribe(event =>{
      if (event instanceof NavigationEnd){
        this.categoryId = this.activatedRoute.snapshot.paramMap.get('categoryId');
        console.log("Browsing Category: " + this.categoryId);
      }
   })

    if(this.categoryId != null) {
      this.productService.getFilteredProducts(parseInt(this.categoryId)).subscribe({
        next:(response)=>{ 
          this.products = response;
        },
        error:(error)=>{
          console.log('********** ViewAllProductsComponent.ts: ' + error);
        }
      });
    }


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
