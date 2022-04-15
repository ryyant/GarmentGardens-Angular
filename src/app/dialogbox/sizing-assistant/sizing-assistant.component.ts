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
  sizeMessage: string;

  constructor(public sessionService: SessionService) {
    this.gender = "";
    this.fit=""
    this.height=0;
    this.weight=0;

    this.sizeMessage = "";
    this.displaySize = false;
  }
  

  ngOnInit(): void {
  }

  generateSize(): void {
    this.displaySize = true;
    this.sizeMessage = "Your recommended size is ";
    if (this.gender == "Male") {
      if (this.weight <= 50) {
        if (this.height <= 175) {
          this.sizeMessage = "Your recommended size is S";
        } else {
          this.sizeMessage= "Your recommended size is M";
        }
      } else if (this.weight > 50 && this.weight <= 60) {
        if (this.height <= 180) {
          this.sizeMessage= "Your recommended size is M"
        } else {
          this.sizeMessage= "Your recommended size is L";
        }
      }else if (this.weight > 60 && this.weight > 80) {
        if (this.height <= 190) {
          this.sizeMessage = "Your recommended size is L"
        } else {
          this.sizeMessage= "Your recommended size is XL";
        }
      } else {
        this.sizeMessage = "Your recommended size is XXL"
      }
    } else {
      if (this.weight <= 50) {
        if (this.height <= 175) {
          this.sizeMessage = "Your recommended size is XS";
        } else {
          this.sizeMessage= "Your recommended size is S";
        }
      } else if (this.weight > 50 && this.weight <= 60) {
        if (this.height <= 180) {
          this.sizeMessage= "Your recommended size is S"
        } else {
          this.sizeMessage= "Your recommended size is M";
        }
      } else if (this.weight > 60) {
        if (this.height <= 190) {
          this.sizeMessage= "Your recommended size is M"
        } else {
          this.sizeMessage= "Your recommended size is L";
        }
      } else {
        this.sizeMessage= "Your recommended size is XL"
      }
    }
  }
}
