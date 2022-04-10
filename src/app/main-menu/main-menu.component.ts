import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})
export class MainMenuComponent implements OnInit {
  constructor(private router: Router, public sessionService: SessionService) {}

  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Browse',
        items: [
          {
            label: 'Tops',
            items: [
              {
                label: 'Products',
                routerLink: ['/systemAdministration/viewAllProductsPf'],
              },
              { label: 'Other', routerLink: ['/pagename'] },
            ],
          },
          {
            label: 'Bottoms',
            items: [
              {
                label: 'Products',
                routerLink: ['/systemAdministration/viewAllProducts'],
              },
              { label: 'Other', routerLink: ['/pagename'] },
            ],
          },
          {
            label: 'Shoes',
            items: [
              {
                label: 'Products',
                routerLink: ['/systemAdministration/viewAllProducts'],
              },
              { label: 'Other', routerLink: ['/pagename'] },
            ],
          },
        ],
      },
      {
        label: 'Customer',
        items: [
          {
            label: 'Transactions',
            routerLink: ['/systemAdministration/viewAllProducts'],
          },
          {
            label: 'Cart',
            routerLink: ['/systemAdministration/viewAllProducts'],
          },
          {
            label: 'Disputes',
            routerLink: ['/systemAdministration/viewAllProducts'],
          },
        ],
      },
      {
        label: 'Seller',
        items: [
          {
            label: 'Manage Products',
            routerLink: ['/systemAdministration/viewAllProducts'],
          },
          {
            label: 'Disputes',
            routerLink: ['/systemAdministration/viewAllProducts'],
          },
        ],
      },
    ];
  }

  userLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentUser(null);

    this.router.navigate(['/index']);
  }
}
