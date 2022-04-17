import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RoleEnum } from '../models/role-enum';
import { User } from '../models/user';
import { SessionService } from '../services/session.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  ads: number[] = [];
  loginDialogue: boolean | undefined;
  chlorophyll: number | undefined;

  constructor(
    private router: Router,
    public sessionService: SessionService,
    private userService: UserService
  ) {
    this.ads[0] = 0;
    this.ads[1] = 1;
    this.ads[2] = 2;
  }

  ngOnInit(): void {
    setInterval(() => this.randomizeAds(), 5000);
    this.loginDialogue = false;
    this.chlorophyll = this.sessionService.getChlorophyll();
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.sessionService.getIsLogin() == true) {
          this.chlorophyll = this.sessionService.getChlorophyll();
        }
      }
    });
  }

  randomizeAds(): void {
    let counter = 0;

    while (counter < 4) {
      let rand = this.getRandomInt(11);
      if (!this.ads.includes(rand)) {
        this.ads[counter] = rand;
        counter++;
      }
    }
  }

  goToCart() {
    console.log('go to cart');
    if (this.sessionService.getIsLogin() == true) {
      this.router.navigate(['/systemAdministration/viewMyCart']);
    } else {
      this.loginDialogue = true;
    }
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
