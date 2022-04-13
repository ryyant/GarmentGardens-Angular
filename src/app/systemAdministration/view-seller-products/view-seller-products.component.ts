import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SessionService } from '../../services/session.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-view-seller-products',
  templateUrl: './view-seller-products.component.html',
  styleUrls: ['./view-seller-products.component.css']
})
export class ViewSellerProductsComponent implements OnInit {

  products: Product[] | null;
  display: boolean;
  currUser: User;
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
    private primengConfig: PrimeNGConfig) {
    this.products = new Array();
    this.currUser = this.sessionService.getCurrentUser();
    this.display = false;
    this.productToView = new Product();
  }

  ngOnInit(): void {
    this.productService.getSellerProducts(this.currUser).subscribe({
      next: (response) => {
        for (let i = 0; i < response.length; i++) {
          console.log(response[i].name)
        }
        this.products = response;
      },
      error: (error) => {
        console.log('********** ViewAllSellerProductsComponent.ts: ' + error);
      }
    });

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];

    this.primengConfig.ripple = true;
  }

  showDialog(productToView: Product) {
    this.display = true;
    this.productToView = productToView;
  }

  deleteProduct() {
    this.router.navigate(["/systemAdministration/deleteProduct/" + this.productToView.productId]);
  }

  updateProduct(){
    this.router.navigate(["/systemAdministration/updateProduct/" + this.productToView.productId]);
  }

  

  addToCart() {
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
