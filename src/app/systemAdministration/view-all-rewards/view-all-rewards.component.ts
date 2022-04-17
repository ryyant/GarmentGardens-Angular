import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import {RewardService } from '../../services/reward.service';
import { Reward } from 'src/app/models/reward';

import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { RewardEnum } from 'src/app/models/reward-enum';

@Component({
  selector: 'app-view-all-rewards',
  templateUrl: './view-all-rewards.component.html',
  styleUrls: ['./view-all-rewards.component.css']
})
export class ViewAllRewardsComponent implements OnInit {


  rewards: Reward[];
  display: boolean;
  rewardToView: Reward;
  rewardToRedeem: Reward;
  sortOptions: SelectItem[] = [];

  resultSuccess: boolean;
	resultError: boolean;
	message: string | undefined;


  sortOrder: number = 0;
  sortKey: string = "";
  sortField: string = "";

  displayCopyClipboard: boolean ;
  displayCopyClipboardMessage: string;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private rewardService: RewardService,
    private primengConfig: PrimeNGConfig) {
      this.rewards = new Array();
      this.display = false;
      this.rewardToView = new Reward();
      this.rewardToRedeem = new Reward();
      this.resultSuccess = false;
      this.resultError = false;
      this.displayCopyClipboard = false;
      this.displayCopyClipboardMessage="";
    }


  ngOnInit(): void
  {
    this.rewardService.getAvailableRewards().subscribe({
      next:(response)=>{
        this.rewards = response;
      },
      error:(error)=> {
        console.log('********** ViewAllRewardsComponent.ts: ' + error);
      }
    });
    console.log(this.rewards);
    this.primengConfig.ripple = true;
  }

  redeemReward(rewardToRedeem: Reward) {
    this.rewardToRedeem = rewardToRedeem;
    let currentChloro = this.sessionService.getChlorophyll();

    if ((rewardToRedeem.rewardEnum == 'PROMOCODE10' && currentChloro < 200) || (rewardToRedeem.rewardEnum == 'PROMOCODE35' && currentChloro < 600) || (rewardToRedeem.rewardEnum == 'PROMOCODE60' && currentChloro < 1000)) {
      this.resultError = true;
      this.resultSuccess = false;
      this.message = "Insufficient chlorophyll balance!";
      return;
    }


    this.rewardService.redeemReward(this.sessionService.getCurrentUser().userId, rewardToRedeem.rewardId).subscribe({
      next:(response)=>{
        this.resultSuccess = true;
        this.resultError = false;
        this.message = "Reward redeemed successfully";

        if (rewardToRedeem.rewardEnum == 'PROMOCODE10') {
          this.sessionService.deductChlorophyll(200);
        } else if (rewardToRedeem.rewardEnum == 'PROMOCODE35') {
          this.sessionService.deductChlorophyll(600);
        } else if (rewardToRedeem.rewardEnum == 'PROMOCODE60') {
          this.sessionService.deductChlorophyll(1000);
        }
      },
      error:(error)=>{
        this.resultError = true;
        this.resultSuccess = false;
        this.message = "An error has occurred while redeeming the reward";
        
        console.log('********** UpdateProductComponent.ts: ' + error);
      }
    })
    this.rewards = this.rewards.filter(
      (reward) => reward != rewardToRedeem
    );
    // window.location.reload();
  }

  parseDate(d: Date | undefined)
    {		
      if(d != null)
      {
          return d.toString().replace('[UTC]', '');
      }
      else
      {
          return '';
      }
    }

  showDialog(rewardToView: Reward)
  {
    this.display = true;
    this.rewardToView = rewardToView;
    this.resultSuccess = false;
    this.resultError = false;
  }

  copyToClipboard() {
    this.displayCopyClipboard = true;
    this.displayCopyClipboardMessage="COPIED";
  }

  viewRewardDetails() {
    this.router.navigate(["/systemAdministration/viewRewardDetails/" + this.rewardToView.rewardId])
  }

  onSortChange(event: { value: any; }) {
  let value = event.value;

  if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
  }
  else {
      this.sortOrder = 1;
      this.sortField = value;
  }
}




}
