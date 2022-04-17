import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { DatePipe } from '@angular/common';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})


export class MainMenuComponent implements OnInit {

  menuCustomer: MenuItem[] = [];
  menuSeller: MenuItem[] = [];
  restrictedMenu: MenuItem[] = [];
  display: boolean;
  date: Date;
  flashSaleDate: Date;
  flashSaleEnds: Date;
  constructor(public datePipe: DatePipe, private router: Router, public sessionService: SessionService, private categoryService: CategoryService
    ) {
      this.display = false;
      this.date =new Date();
      let flash = new Date();
      flash.setHours(17);
      flash.setMinutes(14);
      flash.setSeconds(0);
      this.flashSaleDate = flash;
      let flash2 = new Date();
      flash.setHours(17);
      flash.setMinutes(34);
      flash.setSeconds(0);
      this.flashSaleEnds = flash2;
      }

  
  ngOnInit() {

    // MENU FOR ANYONE
    this.restrictedMenu = [
      {
        label: 'Browse',
        routerLink: ['/systemAdministration/viewAllProducts'],
        items: [
          {
            label: 'All',
            routerLink: ['/systemAdministration/viewAllProducts'],
          },
        ]
      }
    ]

    // THIS IS TO GENERATE ALL THE CATEGORIES, IMPORTANT!!
    this.categoryService.getRootCategories().subscribe({
      next: (rootCategories) => {
          let items = this.restrictedMenu[0].items;
          this.addToTree(items, rootCategories);
      },
      error: (error) => {
        console.log('Generating Root Categories error, ' + error);
      }
    })

      // MENU FOR LOGGED-IN USERS
    this.menuCustomer = [
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
            label: 'Cart',
            routerLink: ['/systemAdministration/viewMyCart'],
          },
          {
            label: 'Transactions',
            routerLink: ['/systemAdministration/viewMyTransactions'],
          },
          {
            label: 'Disputes',
            routerLink: ['/systemAdministration/viewDisputes'],
          },
        ],
      },
    ];

      this.menuSeller  = [
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
        label: 'Seller',
        items: [
          {
            label: 'Manage Products',
            routerLink: ['/systemAdministration/viewSellerProducts'],
          },
          {
            label: 'Disputes',
            routerLink: ['/systemAdministration/viewDisputes'],
          },
        ],
      },
    ];

    this.menuCustomer.push(
      {
        label: 'Donate',
        routerLink: ['/systemAdministration/donatePage'],
      },
      {
        label: 'About Us',
        routerLink: ['/systemAdministration/aboutUs'],
      }
    )
    this.menuSeller.push(
      {
        label: 'Donate',
        routerLink: ['/systemAdministration/donatePage'],
      },
      {
        label: 'About Us',
        routerLink: ['/systemAdministration/aboutUs'],
      }
    )
    this.restrictedMenu.push(
      {
        label: 'Donate',
        routerLink: ['/systemAdministration/donatePage'],
      },
      {
        label: 'About Us',
        routerLink: ['/systemAdministration/aboutUs'],
      }
    )
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
                routerLink: ['/systemAdministration/viewProductByCategory/' + categories[i].categoryId],
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
                routerLink: ['/systemAdministration/viewProductByCategory/' + categories[i].categoryId]
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

  showDialog() {
    this.display = true;
  }
  
  userLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentUser(null);

    this.router.navigate(['/index']);
  }
}
