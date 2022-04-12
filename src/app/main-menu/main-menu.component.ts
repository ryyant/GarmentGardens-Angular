import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})
export class MainMenuComponent implements OnInit {
  constructor(private router: Router, public sessionService: SessionService, private categoryService: CategoryService
    ) {}

  menu: MenuItem[] = [];
  restrictedMenu: MenuItem[] = [];

  ngOnInit() {

    this.restrictedMenu = [
      {
        label: 'All Products',
        routerLink: ['/systemAdministration/viewAllProducts'],
        items: [
            {
            label: 'Top',
            routerLink: ['/systemAdministration/viewAllTops'],
            },
            {
              label: 'Headwear',
              routerLink: ['/systemAdministration/viewAllHeadwears'],
            },
            {
              label: 'Bottom',
              routerLink: ['/systemAdministration/viewAllBottoms'],
            },
            {
              label: 'Undergarment',
              routerLink: ['/systemAdministration/viewAllUndergarments'],
            },
        ]
      }
    ]

      // this.categoryService.getRootCategories().subscribe({
      //   next: (rootCategories) => {
      //       let items = this.restrictedMenu[0].items;
      //       this.addToTree(items, rootCategories);
      //   },
      //   error: (error) => {
      //     console.log('Generating Root Categories error, ' + error);
      //   }
      // })

    this.menu = [
        this.restrictedMenu[0],
        {
          label: 'Rewards',
          items: [
            {
              label: 'My Rewards',
              routerLink: ['/systemAdministration/viewMyRewards'],
            },
            {
              label: 'All Rewards',
              routerLink: ['/systemAdministration/viewAllRewards'],
            },
          ],
        },
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


  addToTree(treeItems: any, categories: Category[]): void {

    for (let i=0; i < categories.length; i++) {
      let categoryId = categories[i].categoryId;
      if (categoryId != null) {
      this.categoryService.getSubCategories(categoryId).subscribe({
        next: (subCategories) => {
          if (subCategories != null) {
            if (treeItems) {
              treeItems.push({
                label: categories[i].name,
                items: [],
              });
            }
            let idx = 0;
            for (let x=0; x<treeItems.length; x++) {
              if (treeItems[x].label === categories[i].name) {
                idx = x;
              }
            }

            this.addToTree(treeItems[idx].items, subCategories);

          } else {
            if (treeItems) {
              treeItems.push({
                label: categories[i].name,
                routerLink: ['/' + categories[i].name]
              });
            }
          }
        },
        error: (error) => {
          console.log('Generating Sub Categories error, ' + error);
        }
      })
    }
  }
  }

  userLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentUser(null);

    this.router.navigate(['/index']);
  }
}
