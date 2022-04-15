import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import {RewardService } from '../../services/reward.service';
import { Reward } from 'src/app/models/reward';
import { PrimeNGConfig } from 'primeng/api';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-view-my-rewards',
  templateUrl: './view-my-rewards.component.html',
  styleUrls: ['./view-my-rewards.component.css']
})
export class ViewMyRewardsComponent implements OnInit {
  rewards: Reward[];
  display: boolean;
  rewardToView: Reward;
  rewardToUse: Reward;

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
      this.rewardToUse = new Reward();
      this.resultSuccess = false;
      this.resultError = false;
      this.displayCopyClipboard = false;
      this.displayCopyClipboardMessage="";
     }

  ngOnInit(): void {
    this.rewardService.getMyRewards(this.sessionService.getCurrentUser().userId).subscribe({
      next:(response)=> {
        this.rewards = response;
      },
      error:(error)=> {
        console.log("********** ViewMyRewardsComponent.ts " + error);
      }
    })
  }

  showDialog(rewardToView: Reward)
  {
    this.display = true;
    this.rewardToView = rewardToView;
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
  useReward(rewardToUse: Reward) {
    this.rewardToUse = rewardToUse;
    console.log(rewardToUse);
    this.rewardService.useReward(this.sessionService.getCurrentUser().userId, rewardToUse.rewardId).subscribe({
      next:(response)=>{
        this.resultSuccess = true;
        this.resultError = false;
        this.message = "Reward used successfully";
      },
      error:(error)=>{
        this.resultError = true;
        this.resultSuccess = false;
        this.message = "An error has occurred while using the reward: " + error;
        
        console.log('********** ViewAllRewardsComponent.ts: ' + error);
      }
    })
    console.log(this.message)

    window.location.reload();
  }

  copyToClipboard() {
    this.displayCopyClipboard = true;
    this.displayCopyClipboardMessage="COPIED TO CLIPBOARD";
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
