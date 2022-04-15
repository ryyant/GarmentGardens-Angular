import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { CartService } from '../../services/cart.service';
import { LineItem } from 'src/app/models/line-item';

import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-view-my-cart',
  templateUrl: './view-my-cart.component.html',
  styleUrls: ['./view-my-cart.component.css']
})
export class ViewMyCartComponent implements OnInit {

  carts: LineItem[];
  display: boolean;
  currUser: User;

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;
  sortKey: string = "";
  sortField: string = "";


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private cartService: CartService,
    private primengConfig: PrimeNGConfig) { 
      this.carts = new Array();
      this.display = false;
      this.currUser = this.sessionService.getCurrentUser();
    }

  
    ngOnInit(): void
  {
    this.cartService.retrieveMyLineItems(this.currUser).subscribe({
      next:(response)=>{
        this.carts = response;
      },
      error:(error)=> {
        console.log('********** ViewMyCartComponent.ts: ' + error);
      }
    });
    console.log(this.carts);
  }

  showDialog(rewardToView: LineItem)
  {
    this.display = true;
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
