import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../services/session.service';
import { StaffService } from '../services/staff.service';
import { MotdService } from '../services/motd.service';
import { RoleEnum } from '../models/role-enum';
import { Staff } from '../models/staff';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: string | undefined;
  password: string | undefined;
  loginError: boolean;
  errorMessage: string | undefined;

  userChlorophyll: number | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private userService: UserService,
    private motdService: MotdService
  ) {
    this.loginError = false;
  }

  ngOnInit(): void {}

  userLogin(): void {
    // this.sessionService.setUsername(this.username);
    // this.sessionService.setPassword(this.password);

    this.userService.userLogin(this.username, this.password).subscribe({
      next: (response) => {
        let user: User = response;

        console.log(response);
        if (response.role?.toString() == 'CUSTOMER') {
          user.role = RoleEnum.CUSTOMER;
        } else if (response.role?.toString() == 'SELLER') {
          user.role = RoleEnum.SELLER;
        }

        if (user != null) {
          this.sessionService.setIsLogin(true);
          this.sessionService.setCurrentUser(user);
          this.sessionService.setUsername(this.username);
          this.sessionService.setPassword(this.password);
          this.sessionService.setChlorophyll(user.chlorophyll);
          console.log(this.sessionService.getChlorophyll());

          this.loginError = false;
          console.log('Successful Login');
          this.router.navigate(['/index']);
          // this.motdService.getMotds().subscribe({
          //   next:(response)=>{
          //     this.sessionService.setMotds(response);
          //     // this.router.navigate(["/index"]);
          //     window.location.reload();
          //   },
          //   error:(error)=>{
          //     console.log('********** IndexComponent.ts: ' + error);
          //   }
          // });
        } else {
          this.loginError = true;
        }
      },
      error: (error) => {
        this.loginError = true;
        this.errorMessage = error;
        console.log('Error in logging in');
      },
    });
  }

  userLogout(): void {
    console.log("user logout");
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentUser(null);
    this.sessionService.setUsername('');
    this.sessionService.setPassword('');
    this.sessionService.setChlorophyll(0);

    this.sessionService.setMotds(new Array());

    this.router.navigate(['/index']);
  }

  viewProfile(): void {
    this.router.navigate(['/systemAdministration/viewProfilePage']);
  }
}
