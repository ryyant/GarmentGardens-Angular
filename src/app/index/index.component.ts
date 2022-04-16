import { Component, OnInit } from '@angular/core';
import { MessageOfTheDay } from '../models/message-of-the-day';
import { MotdService } from '../services/motd.service';

import { SessionService } from '../services/session.service';




@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit
{
  messageOfTheDays: MessageOfTheDay []



  constructor(public sessionService: SessionService,
            private motdService: MotdService)
  {
    this.messageOfTheDays = new Array();
  }



  ngOnInit(): void
  {
    this.motdService.getMotds().subscribe({
      next:(response)=>{
        this.messageOfTheDays=response;
      },
      error:(error)=> {
        console.log('******** MessageOfTheDay index.ts' + error)
      }
    })
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
}

