import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../services/session.service';
import { StaffService } from '../services/staff.service';
import { MotdService } from '../services/motd.service';
import { AccessRightEnum } from '../models/access-right-enum';
import { Staff } from '../models/staff';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
{
  username: string | undefined;
  password: string | undefined;
  loginError: boolean;
  errorMessage: string | undefined;



  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              public sessionService: SessionService,
              private staffService: StaffService,
              private motdService: MotdService)
  {
    this.loginError = false;
  }



  ngOnInit(): void
  {    
  }



  staffLogin(): void
  {
    this.sessionService.setUsername(this.username);
		this.sessionService.setPassword(this.password);
					
		this.staffService.staffLogin(this.username, this.password).subscribe({
      next:(response)=>{
        let staff: Staff = response;

				if(response.accessRightEnum?.toString() == 'CASHIER')
				{
					staff.accessRightEnum = AccessRightEnum.CASHIER;
				}
				else if(response.accessRightEnum?.toString() == 'MANAGER')
				{
					staff.accessRightEnum = AccessRightEnum.MANAGER;
				}
				
				if(staff != null)
				{
					this.sessionService.setIsLogin(true);
					this.sessionService.setCurrentStaff(staff);					
					this.loginError = false;

          this.motdService.getMotds().subscribe({
            next:(response)=>{
              this.sessionService.setMotds(response);
              // this.router.navigate(["/index"]);
              window.location.reload();
            },
            error:(error)=>{
              console.log('********** IndexComponent.ts: ' + error);
            }
          });					                    					
				}
				else
				{
					this.loginError = true;
				}
      },
      error:(error)=>{
        this.loginError = true;
				this.errorMessage = error
      }
    });
  }



  staffLogout(): void
  {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentStaff(null);
    this.sessionService.setMotds(new Array());

    this.router.navigate(["/index"]);
  }
}
