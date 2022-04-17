import { Component, OnInit } from '@angular/core';
import { MessageOfTheDay } from '../models/message-of-the-day';
import { MotdService } from '../services/motd.service';
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from '../services/session.service';




@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit
{
  messageOfTheDays: MessageOfTheDay[];


  images: number[];

  constructor(private router: Router, public sessionService: SessionService,
            private motdService: MotdService)
  {
    this.messageOfTheDays = new Array();
    this.images = [1,2,3];
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
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
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

