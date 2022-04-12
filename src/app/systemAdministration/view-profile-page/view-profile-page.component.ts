import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { SelectItem, PrimeNGConfig } from 'primeng/api';
import { SessionService } from '../../services/session.service';
import { MessageService } from 'primeng/api';
import { RoleEnum } from 'src/app/models/role-enum';

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

  yearRange: string = '1921:' + new Date().getFullYear();
  maxDate: Date = new Date();

  formRole: String | undefined;
  stateOptions: any[];

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

    this.formRole = this.currUser.role;
    this.stateOptions = [
      { label: 'Customer', value: 'CUSTOMER' },
      { label: 'Seller', value: 'SELLER' },
    ];

    this.currUser.role = RoleEnum.CUSTOMER;
    console.log(typeof this.formRole);
    console.log(this.formRole);
    console.log(RoleEnum.CUSTOMER);
    
    console.log(this.currUser.role);
  }

  ngOnInit(): void {
    this.checkLogin();
    let dateString = new String(this.currUser.dateOfBirth);
    let updateString = dateString.slice(0, 10);
    this.currUser.dateOfBirth = new Date(updateString);
  }

  updateProfile(updateProfileForm: NgForm) {
    this.submitted = true;

    if (updateProfileForm.valid) {
      this.userService.updateUser(this.currUser).subscribe({
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
