import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  ads: number[] = [];

  constructor() { 
    this.ads[0] = 0;
    this.ads[1] = 1;
    this.ads[2] = 2;
  }

  ngOnInit(): void {
    setInterval(() => this.randomizeAds(), 5000);
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

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

}
