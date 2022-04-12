import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';


@Component({
  selector: 'app-view-seller-products',
  templateUrl: './view-seller-products.component.html',
  styleUrls: ['./view-seller-products.component.css']
})
export class ViewSellerProductsComponent implements OnInit {

  products: Product[] | null;

  
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private productService: ProductService) { 
      this.products = new Array();
    }

  ngOnInit(): void {
    
    this.productService.getProducts().subscribe({
      next: (response) => {
        for (let i = 0; i < response.length; i++) {
          console.log(response[i].name)
        }
        this.products = response;
      },
      error: (error) => {
        console.log('********** ViewAllProductsComponent.ts: ' + error);
      }
    });


  }

  

}
