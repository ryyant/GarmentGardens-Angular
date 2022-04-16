import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DisputeService } from 'src/app/services/dispute.service';

import { SessionService } from '../../services/session.service';
import { Dispute } from 'src/app/models/dispute';


@Component({
  selector: 'app-create-dispute',
  templateUrl: './create-dispute.component.html',
  styleUrls: ['./create-dispute.component.css']
})
export class CreateDisputeComponent implements OnInit {

  submitted: boolean;
	orderId: string | null;
  dispute: Dispute;

  error: boolean | undefined;
	showMessage: boolean | undefined;
	message: string | undefined;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private disputeService: DisputeService) { 
      this.dispute = new Dispute();
      this.submitted = false;
      this.showMessage = false;
      this.orderId = '';

    }

  ngOnInit(): void {

    this.orderId = this.activatedRoute.snapshot.paramMap.get('orderId');
    console.log(this.orderId);
  }

  create(createDisputeForm: NgForm) {
    
    this.submitted = true;

    if (createDisputeForm.valid && this.orderId !== null) {
      console.log(this.orderId);

      this.disputeService.createNewDispute(this.dispute, this.orderId).subscribe({
        next: (response) => {
          let newProductId: number = response;
          this.error = false;
          this.message = "New dispute " + newProductId + " created successfully";

          this.dispute = new Dispute();
          // this.newProduct.productRating = 1;
          createDisputeForm.resetForm();
          createDisputeForm.reset();
        },
        error: (error) => {
          this.error = true;
          this.message = "An error has occurred while creating the new dispute: " + error;

          console.log('********** CreateNewProductComponent.ts: ' + error);
        }
      });
    }
  }

  clear() {
    this.submitted = false;
    this.dispute = new Dispute();
    // this.newProduct.productRating = 1;
  }

}
