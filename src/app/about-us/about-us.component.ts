import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  options: any;
  overlays: any[];

  constructor() {}

  ngOnInit(): void {
    this.options = {
      center: { lat: 1.29305, lng: 103.77536 },
      zoom: 12,
    };
    this.overlays = [
      new google.maps.Marker({
        position: { lat: 1.29305, lng: 103.77536 },
        title: 'Garment Gardens Office',
      }),
    ];
  }
}
