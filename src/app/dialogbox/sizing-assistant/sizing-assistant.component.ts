import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-sizing-assistant',
  templateUrl: './sizing-assistant.component.html',
  styleUrls: ['./sizing-assistant.component.css']
})
export class SizingAssistantComponent implements OnInit {
  gender: string;
  genderOptions: string[] = ["Male", "Female"];
  fitOptions: string[] = ["Fitting", "Slightly Loose", "Oversized", "Baggy"]
  fit: string;
  height: number;
  weight: number;

  displaySize: boolean;
  recommendedSize: string;

  constructor(public sessionService: SessionService) {
    this.gender = "";
    this.fit=""
    this.height=155;
    this.weight=50;
    this.recommendedSize="";
    this.displaySize = false;
  }
  

  ngOnInit(): void {
    this.recommendedSize = this.sessionService.getRecommendedSize() === null ? "" : this.sessionService.getRecommendedSize();
  }

  generateSize(): void {
    this.displaySize = true;
    
    if (this.gender == "Male") {
      if (this.weight <= 50) {
        if (this.height <= 175) {
          this.recommendedSize ="S";
        } else {
          this.recommendedSize ="M";
        }
      } else if (this.weight > 50 && this.weight <= 60) {
        if (this.height <= 180) {
          this.recommendedSize ="M"
        } else {
          this.recommendedSize ="L";
        }
      }else if (this.weight > 60 && this.weight > 80) {
        if (this.height <= 190) {
          this.recommendedSize ="L"
        } else {
          this.recommendedSize = "XL";
        }
      } else {
        this.recommendedSize = "XXL"
      }
    } else {
      if (this.weight <= 50) {
        if (this.height <= 175) {
          this.recommendedSize ="XS";
        } else {
          this.recommendedSize ="S";
        }
      } else if (this.weight > 50 && this.weight <= 60) {
        if (this.height <= 180) {
          this.recommendedSize ="S"
        } else {
          this.recommendedSize ="M";
        }
      } else if (this.weight > 60) {
        if (this.height <= 190) {
          this.recommendedSize ="M"
        } else {
          this.recommendedSize ="L";
        }
      } else {
        this.recommendedSize ="XL"
      }
    }
    this.setSessionStorageRecommendedSize();
  }
  
  setSessionStorageRecommendedSize() {
    this.sessionService.setRecommendedSize(this.recommendedSize);
  }
}
