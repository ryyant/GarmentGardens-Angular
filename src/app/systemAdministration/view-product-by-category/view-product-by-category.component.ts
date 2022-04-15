import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Category } from '../../models/category';

@Component({
  selector: 'app-view-product-by-category',
  templateUrl: './view-product-by-category.component.html',
  styleUrls: ['./view-product-by-category.component.css'],
})
export class ViewProductByCategoryComponent implements OnInit {
  products: Product[];
  display: boolean;
  loginDialogue: boolean;
  productToView: Product;
  message: string = '';
  qtyToAdd: number = 0;

  categoryId: string | null;
  viewCategory: Category | null;

  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortKey: string = '';
  sortField: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private cartService: CartService,
    private primengConfig: PrimeNGConfig
  ) {
    this.products = new Array();
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('categoryId');
    this.display = false;
    this.loginDialogue = false;
    this.productToView = new Product();
    this.viewCategory = new Category();
  }

  ngOnInit(): void {
    this.renderProducts();

    // IMPORTANT FOR SAME ROUTE, DYNAMIC CHANGE
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.categoryId =
          this.activatedRoute.snapshot.paramMap.get('categoryId');
        this.renderProducts();
        console.log('Browsing Category: ' + this.categoryId);
      }
    });

    this.sortOptions = [
      { label: 'Price High to Low', value: '!unitPrice' },
      { label: 'Price Low to High', value: 'unitPrice' },
    ];

    this.primengConfig.ripple = true;
  }

  renderProducts() {
    if (this.categoryId != null) {
      this.categoryService
        .getCategoryByCategoryId(parseInt(this.categoryId))
        .subscribe({
          next: (response) => {
            this.viewCategory = response;
          },
          error: (error) => {
            console.log('********** ViewAllProductsComponent.ts: ' + error);
          },
        });

      this.productService
        .getFilteredProducts(parseInt(this.categoryId))
        .subscribe({
          next: (response) => {
            this.products = response;
          },
          error: (error) => {
            console.log('********** ViewAllProductsComponent.ts: ' + error);
          },
        });
    }
  }

  showDialog(productToView: Product) {
    this.display = true;
    this.qtyToAdd = 0;
    this.message = "";
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
