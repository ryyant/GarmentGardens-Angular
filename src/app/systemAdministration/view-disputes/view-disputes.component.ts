import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { Dispute } from '../../models/dispute';
import { DisputeService } from 'src/app/services/dispute.service';
import { ArrayType } from '@angular/compiler';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-view-disputes',
  templateUrl: './view-disputes.component.html',
  styleUrls: ['./view-disputes.component.css']
})
export class ViewDisputesComponent implements OnInit {

  disputes: Dispute[] | null;

  currUser: User;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              public sessionService: SessionService,
              private disputeService: DisputeService) { 
    this.disputes = new Array();
    this.currUser = this.sessionService.getCurrentUser();
  }

  ngOnInit(): void {
    this.checkAccessRight()

    this.disputeService.getMyDispute(this.currUser).subscribe({
      next:(response)=>{
        this.disputes = response;
      },
      error:(error)=>{
        console.log('********** ViewAllDisputeComponent.ts: ' + error);
      }
    });
  }

  checkAccessRight()
	{
    console.log(this.checkAccessRight);
    
		if(!this.sessionService.checkAccessRight(this.router.url))
		{
			this.router.navigate(["/accessRightError"]);
		}
	}

}
