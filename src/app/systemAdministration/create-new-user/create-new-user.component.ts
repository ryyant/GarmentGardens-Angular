import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { TagService } from '../../services/tag.service';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { User } from '../../models/user';


@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css']
})
export class CreateNewUserComponent implements OnInit {

  submitted: boolean;
  newUser: User;

  resultSuccess: boolean;
  resultError: boolean;
  message: string | undefined;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {
    this.submitted = false;
    this.newUser = new User();


    this.resultSuccess = false;
    this.resultError = false;
  }

  ngOnInit(): void {
  }

  create(createUserForm: NgForm) {
    this.submitted = true;

    console.log('Hiiiiiiiiiiiiiiiiiiiiiii');

    if (createUserForm.valid) {
      this.userService.createNewUser(this.newUser).subscribe({
        next: (response) => {
          let newProductId: number = response;
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "New user " + newProductId + " created successfully";

          this.newUser = new User();
          createUserForm.resetForm();
          createUserForm.reset();
        },
        error: (error) => {
          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while creating the new product: " + error;

          console.log('********** CreateNewProductComponent.ts: ' + error);
        }
      });
    }
  }

  clear() {
    this.submitted = false;
    this.newUser = new User();
  }

}
