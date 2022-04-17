import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DisputeService } from 'src/app/services/dispute.service';

import { SessionService } from '../../services/session.service';
import { Dispute } from 'src/app/models/dispute';
import { DisputeStatusEnum } from 'src/app/models/dispute-status-enum';


@Component({
  selector: 'app-create-dispute',
  templateUrl: './create-dispute.component.html',
  styleUrls: ['./create-dispute.component.css']
})
export class CreateDisputeComponent implements OnInit {

  submitted: boolean;
	orderId: string | null;
  newDispute: Dispute;

  error: boolean;
	showMessage: boolean;
	message: string;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private disputeService: DisputeService) { 
      this.newDispute = new Dispute();
      this.submitted = false;
      this.showMessage = false;
      this.message = '';
      this.error = false;

    }

  ngOnInit(): void {

    this.orderId = this.activatedRoute.snapshot.paramMap.get('orderId');
    console.log(this.orderId);
  }

  create(createDisputeForm: NgForm) {
    
    this.submitted = true;

    if (createDisputeForm.valid && this.orderId !== null) {

      this.disputeService.createNewDispute(this.newDispute, this.orderId).subscribe({
        next: (response) => {
          let newDisputeId: number = response;
          this.showMessage = true;
          this.error = false;
          this.message = "New dispute " + newDisputeId + " created successfully";
          console.log("Dispute" + newDisputeId);
          
        },
        error: (error) => {
          this.showMessage = true;
          this.error = true;
          this.message = "An error has occurred while creating the new dispute: " + error;

          console.log('********** CreateNewDisputeComponent.ts: ' + error);
        }
      });
    }
  }

  clear() {
    this.submitted = false;
    this.newDispute = new Dispute();
    // this.newProduct.productRating = 1;
  }

}
