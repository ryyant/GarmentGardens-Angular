import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { SelectItem, PrimeNGConfig } from 'primeng/api';
import { SessionService } from '../../services/session.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-profile-page',
  templateUrl: './view-profile-page.component.html',
  styleUrls: ['./view-profile-page.component.css'],
  providers: [MessageService],
})
export class ViewProfilePageComponent implements OnInit {
  submitted: boolean;
  currUser: User;

  resultSuccess: boolean;
  resultError: boolean;
  message: string | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private primeNGConfig: PrimeNGConfig,
    public sessionService: SessionService
  ) {
    this.submitted = false;
    this.currUser = this.sessionService.getCurrentUser();

    this.resultSuccess = false;
    this.resultError = false;
  }

  ngOnInit(): void {
    this.checkLogin();
    console.log('Customer DOB::' + this.currUser.dateOfBirth);
    console.log('Customer DOB Type ::' + typeof this.currUser.dateOfBirth);
  }

  updateProfile(updateProfileForm: NgForm) {
    this.submitted = true;
    let tempUser: User = Object.assign({}, this.currUser);
    tempUser.dateOfBirth = undefined;
    tempUser.password = this.sessionService.getPassword();

    if (updateProfileForm.valid) {
      this.userService.updateUser(tempUser).subscribe({
        next: (response) => {
          this.sessionService.setCurrentUser(this.currUser);
          this.resultError = false;
        },
        error: (error) => {
          this.resultError = true;
          this.resultSuccess = false;
          this.message =
            'An error has occurred while updating profile: ' + error;
          console.log(error);
        },
      });
    }
  }

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }
}
