import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';

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

  items: MenuItem[] = [];

  ngOnInit() {
      this.items = [
          {
              label: 'File',
              items: [{
                      label: 'New', 
                      icon: 'pi pi-fw pi-plus',
                      items: [
                          {label: 'Project'
                          , routerLink: ['/systemAdministration/viewAllProducts']},
                          {label: 'Other'
                          , routerLink: ['/pagename']},
                      ]
                  },
                  {label: 'Open'},
                  {label: 'Quit'}
              ]
          },
          {
              label: 'Edit',
              icon: 'pi pi-fw pi-pencil',
              items: [
                  {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                  {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
              ]
          }
      ];
  }

  userLogout(): void
	{
		this.sessionService.setIsLogin(false);
		this.sessionService.setCurrentUser(null);
		
		this.router.navigate(["/index"]);
	}
}
