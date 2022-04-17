import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { CartService } from '../../services/cart.service';
import { LineItem } from 'src/app/models/line-item';

import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { User } from 'src/app/models/user';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { RatingResourceService } from 'src/app/services/rating-resource.service';
import { NgForm } from '@angular/forms';
import { Rating } from 'src/app/models/rating';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-view-my-transactions',
  templateUrl: './view-my-transactions.component.html',
  styleUrls: ['./view-my-transactions.component.css'],
})
export class ViewMyTransactionsComponent implements OnInit {
  orders: Order[];
  display: boolean;
  currUser: User;
  promoCode: string;
  lifetimeSpendings: number;
  lineItems: LineItem[];
  reviewProduct: boolean;
  selectedProduct: Product | undefined;
  newRating: Rating;

  error: boolean | undefined;
  showMessage: boolean | undefined;
  message: string | undefined;

  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortKey: string = '';
  sortField: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    public ratingResourceService: RatingResourceService,
    private cartService: CartService,
    private primengConfig: PrimeNGConfig
  ) {
    this.orders = new Array();
    this.display = false;
    this.currUser = this.sessionService.getCurrentUser();
    this.promoCode = '';
    this.error = false;
    this.showMessage = false;
    this.lifetimeSpendings = 0;
    this.lineItems = new Array();
    this.reviewProduct = false;
    this.selectedProduct = new Product();
    this.newRating = new Rating();
  }

  ngOnInit(): void {
    this.cartService.retrieveMyOrders(this.currUser).subscribe({
      next: (response) => {
        this.orders = response;
        console.log(this.orders);
        this.initLifetimeSpending(response);
      },
      error: (error) => {
        console.log('********** ViewMyOrdersComponent.ts: ' + error);
      },
    });

    this.sortOptions = [
      { label: 'Sub Total High to Low', value: '!subTotal' },
      { label: 'Sub Total Low to High', value: 'subTotal' },
    ];

    this.primengConfig.ripple = true;
  }

  initLifetimeSpending(orders: Order[]) {
    for (let i = 0; i < this.orders.length; i++) {
      this.lifetimeSpendings += this.orders[i].totalAmount as number;
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

  reviewProductDialogue(lineItem: LineItem) {
    this.reviewProduct = true;
    this.selectedProduct = lineItem.product;
    this.newRating = new Rating();
    this.error = false;
    this.showMessage = false;
    this.message = '';
  }

  openDispute(order: Order) {
    this.router.navigate([
      '/systemAdministration/createDispute/' + order.orderId,
    ]);
  }

  review(createReviewForm: NgForm) {
    if (
      createReviewForm.valid &&
      this.selectedProduct != null &&
      this.newRating != null
    ) {
      this.ratingResourceService
        .rateProduct(this.selectedProduct, this.newRating)
        .subscribe({
          next: (response) => {
            this.error = false;
            this.showMessage = true;
            this.message = 'New Review created successfully';

            this.selectedProduct = new Product();
            this.newRating = new Rating();

            createReviewForm.resetForm();
            createReviewForm.reset();
          },
          error: (error) => {
            this.error = true;
            this.showMessage = true;
            this.message =
              'An error has occurred while creating the new review: ' + error;
          },
        });
    } else {
      this.error = true;
      this.showMessage = true;
      this.message = 'Please fill in the fields!';
    }
  }
}
