import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { SelectItem, PrimeNGConfig } from 'primeng/api';
import { SessionService } from '../../services/session.service';
import { MessageService } from 'primeng/api';
import { RoleEnum } from 'src/app/models/role-enum';

import { CreditCard } from 'src/app/models/credit-card';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-view-profile-page',
  templateUrl: './view-profile-page.component.html',
  styleUrls: ['./view-profile-page.component.css'],
  providers: [MessageService],
})
export class ViewProfilePageComponent implements OnInit {
  currUser: User;

  resultSuccess: boolean;
  resultError: boolean;
  message: string | undefined;

  resultCCSuccess: boolean;
  resultCCError: boolean;
  creditCards: CreditCard[];
  newCC: CreditCard;
  submitted: boolean;
  ccMessage: string | undefined;

  deleteCCSuccess: boolean;
  deleteCCError: boolean;
  deleteCCmessage: string | undefined;
  ccSubmitted: boolean;

  currPw: string | undefined;
  oldPw: string | undefined;
  newPw: string | undefined;
  confirmPw: string | undefined;
  changePwSuccess: boolean;
  changePwError: boolean;
  changePwMessage: string | undefined;
  pwSubmitted: boolean;

  yearRange: string = '1921:' + new Date().getFullYear();
  maxDate: Date = new Date();

  formRole: String | undefined;
  stateOptions: any[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private primengConfig: PrimeNGConfig,
    public sessionService: SessionService,
    private creditCardService: CreditCardService
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

    this.resultCCSuccess = false;
    this.resultCCError = false;
    this.creditCards = new Array();
    this.newCC = new CreditCard();
    this.ccSubmitted = false;

    this.deleteCCSuccess = false;
    this.deleteCCError = false;

    this.currPw = this.sessionService.getPassword();
    this.changePwSuccess = false;
    this.changePwError = false;
    this.pwSubmitted = false;
  }

  ngOnInit(): void {
    this.checkLogin();
    let dateString = new String(this.currUser.dateOfBirth);
    let updateString = dateString.slice(0, 10);
    this.currUser.dateOfBirth = new Date(updateString);

    this.creditCardService.getCreditCards().subscribe({
      next: (response) => {
        this.creditCards = response;
      },
    });
    console.log('reached...');
  }

  updateProfile(updateProfileForm: NgForm) {
    this.submitted = true;

    if (updateProfileForm.valid) {
      this.userService.updateUser(this.currUser).subscribe({
        next: (response) => {
          this.sessionService.setCurrentUser(this.currUser);
          this.resultError = false;
          this.resultSuccess = true;
          this.message = 'You have updated your profile successfully';
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
    this.primengConfig.ripple = true;
  }

  create(createCCForm: NgForm) {
    this.ccSubmitted = true;

    console.log('Creating...');

    if (createCCForm.valid) {
      this.creditCardService.createNewCreditCard(this.newCC).subscribe({
        next: (response) => {
          console.log(response);
          let newCreditCardId: number = response;
          this.resultCCSuccess = true;
          this.resultCCError = false;
          this.ccMessage =
            'New credit card ' + newCreditCardId + ' created successfully';
          this.creditCards = this.creditCards.concat(this.newCC);

          this.newCC = new CreditCard();
          createCCForm.resetForm();
          createCCForm.reset();
        },
        error: (error) => {
          this.resultCCError = true;
          this.resultCCSuccess = false;
          this.ccMessage =
            'An error has occurred while creating the new credit card: ' +
            error;

          console.log('********** ViewProfileComponent.ts: ' + error);
        },
      });
    } else {
      console.log('fail');
    }
  }

  deleteCreditCard(creditCard: CreditCard) {
    let creditCardId = Number(creditCard.creditCardId);
    let userId = Number(this.currUser.userId);
    console.log(
      'Deleting Credit Card ' +
        creditCard.creditCardId +
        ' For UserId ' +
        userId
    );
    console.log('type of userId: ' + typeof userId + ' ' + userId);
    console.log('type of ccId: ' + typeof creditCardId + ' ' + creditCardId);
    this.creditCardService.deleteCreditCard(userId, creditCardId).subscribe({
      next: (response) => {
        console.log(response);
        this.deleteCCSuccess = true;
        this.deleteCCError = false;
        this.deleteCCmessage =
          'Credit card ' + creditCardId + ' deleted successfully';
        this.creditCards = this.creditCards.filter(
          (item) => item != creditCard
        );
      },
      error: (error) => {
        this.deleteCCSuccess = false;
        this.deleteCCError = true;
        this.deleteCCmessage =
          'An error has occured when deleting credit card: ' + error;
        console.log('********** ViewProfileComponent.ts- delete CC: ' + error);
      },
    });
  }

  changePassword(changePasswordForm: NgForm) {
    this.pwSubmitted = true;
    if (changePasswordForm.invalid) {
      this.changePwError = true;
      this.changePwMessage = 'Form is incomplete';
    } else if (this.currPw == this.oldPw && this.newPw == this.confirmPw) {
      let newPassword = new String(this.newPw);
      let passwordString = newPassword.toString();
      this.userService.changePassword(this.currUser, passwordString).subscribe({
        next: (response) => {
          this.sessionService.setCurrentUser(this.currUser);
          this.changePwError = false;
          this.changePwSuccess = true;
          this.changePwMessage = 'You have changed your password successfully';
        },
        error: (error) => {
          this.changePwError = true;
          this.changePwSuccess = false;
          this.changePwMessage =
            'An error has occurred while changing password: ' + error;
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

  clearCC() {
    this.ccSubmitted = false;
    this.newCC = new CreditCard();
  }
}
