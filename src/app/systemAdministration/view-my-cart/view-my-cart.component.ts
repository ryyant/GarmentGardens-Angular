import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { CartService } from '../../services/cart.service';
import { LineItem } from 'src/app/models/line-item';

import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { User } from 'src/app/models/user';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-view-my-cart',
  templateUrl: './view-my-cart.component.html',
  styleUrls: ['./view-my-cart.component.css'],
})
export class ViewMyCartComponent implements OnInit {
  cart: Cart | undefined;
  lineItems: LineItem[];
  display: boolean;
  currUser: User;
  promoCode: string;

  error: boolean;
  showMessage: boolean;
  errorMessage: string | undefined;

  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortKey: string = '';
  sortField: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private cartService: CartService,
    private primengConfig: PrimeNGConfig
  ) {
    this.lineItems = new Array();
    this.display = false;
    this.currUser = this.sessionService.getCurrentUser();
    this.promoCode = '';
    this.error = false;
    this.showMessage = false;
  }

  ngOnInit(): void {
    this.cartService.retrieveMyCart(this.currUser).subscribe({
      next: (response) => {
        this.cart = response;
        console.log(response);
        if (response.cartLineItems != null) {
          this.lineItems = response.cartLineItems;
          console.log(this.lineItems);
        }
      },
      error: (error) => {
        console.log('********** ViewMyCartComponent.ts: ' + error);
      },
    });

    this.sortOptions = [
      { label: 'Sub Total High to Low', value: '!subTotal' },
      { label: 'Sub Total Low to High', value: 'subTotal' },
    ];

    this.primengConfig.ripple = true;
  }

  checkout() {
    console.log('Checking out...');
    if (this.lineItems.length == 0) {
      this.error = true;
      this.showMessage = true;
      this.errorMessage = 'Nothing in Cart!';
    } else {
      this.errorMessage = '';
      // CALL SERVICE HERE, TAKE IN USER AND PROMO CODE
      this.cartService.checkout(this.promoCode).subscribe({
        next: (response) => {
          this.error = false;
          this.showMessage = true;
          this.errorMessage = 'Checkout Complete!';
          this.promoCode = '';
          this.cart = undefined;
          this.lineItems = [];
        },
        error: (error) => {
          this.error = true;
          this.showMessage = true;
          this.errorMessage = 'Checkout Failed!';
        },
      });
    }
  }

  removeLineItem(lineItemToRemove: LineItem) {
    console.log('Removing line item...');
    // CALL SERVICE HERE
    this.cartService.removeLineItem(lineItemToRemove).subscribe({
      next: (response) => {
        this.error = false;
        this.showMessage = true;
        this.errorMessage = 'Removed Successfully!';
        this.lineItems = this.lineItems.filter(item => item != lineItemToRemove);
        console.log(this.errorMessage);
      },
      error: (error) => {
        this.error = true;
        this.showMessage = true;
        this.errorMessage = 'Remove failed!';
        console.log(this.errorMessage);
      },
    });
  }

  clearCart() {
    console.log('Clearing Cart...');
    // CALL SERVICE HERE, TAKE IN USER AND PROMO CODE
    this.cartService.clearCart().subscribe({
      next: (response) => {
        this.error = false;
        this.showMessage = true;
        this.errorMessage = 'Cart Cleared Successfully!';
        this.lineItems = [];
        console.log(this.errorMessage);
      },
      error: (error) => {
        this.error = true;
        this.showMessage = true;
        this.errorMessage = 'Clear failed!';
        console.log(this.errorMessage);
      },
    });
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
