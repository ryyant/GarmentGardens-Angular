import { Component, OnInit} from '@angular/core';
import { SessionService } from './services/session.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GarmentGardens';
  chlorophyll :number |undefined;
  constructor(public sessionService: SessionService,
    private userService: UserService) {
      
    }

    ngOnInit(): void {
      let userLogin = this.sessionService.getIsLogin();
      if (userLogin) {
        let user = this.sessionService.getCurrentUser();
        this.chlorophyll = user.chlorophyll;
        
      }
    }


}
