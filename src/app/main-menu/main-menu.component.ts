import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit
{
  constructor(private router: Router,
              public sessionService: SessionService)
  {

  }

  ngOnInit(): void {
  }



  userLogout(): void
	{
		this.sessionService.setIsLogin(false);
		this.sessionService.setCurrentUser(null);
		
		this.router.navigate(["/index"]);
	}
}
