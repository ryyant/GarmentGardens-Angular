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

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;
  sortKey: string = "";
  sortField: string = "";

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private rewardService: RewardService,
    private primengConfig: PrimeNGConfig) {
      this.rewards = new Array();
      this.display = false;
      this.rewardToView = new Reward();
     }

  ngOnInit(): void {
    this.rewardService.getRewardByUserId(this.sessionService.getCurrentUser()).subscribe({
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
    this.rewardToView = this.rewardToView;
  }

}
