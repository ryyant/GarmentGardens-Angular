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
  styleUrls: ['./view-my-cart.component.css']
})
export class ViewMyCartComponent implements OnInit {

  cart: Cart | undefined;
  lineItems: LineItem[];
  display: boolean;
  currUser: User;
  promoCode: String;

  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortKey: string = "";
  sortField: string = "";


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private cartService: CartService,
    private primengConfig: PrimeNGConfig) { 
      this.lineItems = new Array();
      this.display = false;
      this.currUser = this.sessionService.getCurrentUser();
      this.promoCode = "";
    }

  
    ngOnInit(): void
  {
    this.cartService.retrieveMyCart(this.currUser).subscribe({
      next:(response)=>{
        this.cart = response;
        console.log(response);
        if (response.cartLineItems != null) {
          this.lineItems = response.cartLineItems;
          console.log(this.lineItems);
        }
      },
      error:(error)=> {
        console.log('********** ViewMyCartComponent.ts: ' + error);
      }
    });
  }

  checkout() {

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
