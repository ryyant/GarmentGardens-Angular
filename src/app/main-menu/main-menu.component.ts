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

  menu: MenuItem[] = [];
  restrictedMenu: MenuItem[] = [];

  ngOnInit() {

    this.restrictedMenu = [
      {
        label: 'Browse',
        items: [
          {
            label: 'All',
            routerLink: ['/systemAdministration/viewAllProducts'],
          },
          {
            label: 'Tops',
            items: [
              {
                label: 'Products',
                routerLink: ['/systemAdministration/'],
              },
              { label: 'Other', routerLink: ['/pagename'] },
            ],
          },
          {
            label: 'Bottoms',
            items: [
              {
                label: 'Products',
                routerLink: ['/systemAdministration/'],
              },
              { label: 'Other', routerLink: ['/pagename'] },
            ],
          },
          {
            label: 'Shoes',
            items: [
              {
                label: 'Products',
                routerLink: ['/systemAdministration/'],
              },
              { label: 'Other', routerLink: ['/pagename'] },
            ],
          },
        ]
      }
    ]


    this.menu = [
        this.restrictedMenu[0],
      {
        label: 'Customer',
        items: [
          {
            label: 'Transactions',
            routerLink: ['/systemAdministration/'],
          },
          {
            label: 'Cart',
            routerLink: ['/systemAdministration/'],
          },
          {
            label: 'Disputes',
            routerLink: ['/systemAdministration/'],
          },
        ],
      },
      {
        label: 'Seller',
        items: [
          {
            label: 'Manage Products',
            routerLink: ['/systemAdministration/viewSellerProducts'],
          },
          {
            label: 'Disputes',
            routerLink: ['/systemAdministration/'],
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
