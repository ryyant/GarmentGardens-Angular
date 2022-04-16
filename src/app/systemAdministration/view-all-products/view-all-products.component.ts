import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { RoleEnum } from 'src/app/models/role-enum';

@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.css'],
})
export class ViewAllProductsComponent implements OnInit {
  products: Product[];
  display: boolean;
  loginDialogue: boolean;
  productToView: Product;
  message: string = '';
  qtyToAdd: number = 0;
  role: RoleEnum | undefined;

  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortKey: string = '';
  sortField: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private productService: ProductService,
    private cartService: CartService,
    private primengConfig: PrimeNGConfig
  ) {
    this.products = new Array();
    this.display = false;
    this.loginDialogue = false;
    this.productToView = new Product();
    this.message = '';
    this.role = undefined;
  }

  ngOnInit(): void {
    // IMPORTANT
    if (this.sessionService?.getIsLogin() === true) {
      this.role = this.sessionService?.getCurrentUser()?.role;
    }

    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        console.log('********** ViewAllProductsComponent.ts: ' + error);
      },
    });

    this.sortOptions = [
      { label: 'Price High to Low', value: '!unitPrice' },
      { label: 'Price Low to High', value: 'unitPrice' },
    ];

    this.primengConfig.ripple = true;
  }

  showDialog(productToView: Product) {
    this.display = true;
    this.qtyToAdd = 0;
    this.message = '';
    this.productToView = productToView;
  }

  viewProductDetails() {
    if (this.productToView != undefined) {
      this.router.navigate([
        '/systemAdministration/viewProductDetails/' +
          this.productToView.productId,
      ]);
    }
  }

  addToCart() {
    if (this.sessionService.getIsLogin() == false) {
      this.loginDialogue = true;
      return;
    }

    if (
      this.productToView != null &&
      this.productToView.quantityOnHand != null
    ) {
      if (
        this.qtyToAdd == 0 ||
        this.qtyToAdd > this.productToView.quantityOnHand
      ) {
        console.log('Invalid quantity input!');
        this.message = 'Error';
      } else {
        this.message = '';
        // CALL SERVICE HERE, TAKE IN qtyToAdd and productToView
        this.cartService
          .addToCart(this.productToView, this.qtyToAdd)
          .subscribe({
            next: (response) => {
              console.log('added to cart!');
              this.message = 'Success';
            },
            error: (error) => {
              console.log('********** Add to cart: ' + error);
            },
          });
      }
    }
  }

  onSortChange(event: { value: any }) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
