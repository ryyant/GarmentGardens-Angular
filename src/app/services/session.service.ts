import { Injectable } from '@angular/core';

import { AccessRightEnum } from '../models/access-right-enum';
import { Staff } from '../models/staff';




@Injectable({
  providedIn: 'root'
})
export class SessionService
{
  constructor()
  {
  }



  getIsLogin(): boolean
  {
    if(sessionStorage['isLogin'] == "true")
    {
      return true;
    }
    else
    {
      return false;
    }
  }



  setIsLogin(isLogin: boolean): void
  {
    sessionStorage['isLogin'] = isLogin;
  }


  getCurrentStaff(): Staff
  {
    return JSON.parse(sessionStorage['currentStaff']);
  }



  setCurrentStaff(currentStaff: Staff | null): void
  {		 
    sessionStorage['currentStaff'] = JSON.stringify(currentStaff);
  }



  getUsername(): string
  {
    return sessionStorage['username'];
  }



  setUsername(username: string | undefined): void
  {
    sessionStorage['username'] = username;
  }
  
  
  
  getPassword(): string
  {
    return sessionStorage['password'];
  }



  setPassword(password: string | undefined): void
  {
    sessionStorage['password'] = password;
  }
  
  
  
  checkAccessRight(path : string): boolean
  {
    console.log("********** path: " + path);

    if(this.getIsLogin())
    {
      let staff: Staff = this.getCurrentStaff();

      if(staff.accessRightEnum == AccessRightEnum.ADMINISTRATOR)
      {
        if(path == "/cashierOperation/checkout" ||
            path == "/cashierOperation/voidRefund" ||
            path == "/cashierOperation/viewMySaleTransactions")
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      else if(staff.accessRightEnum == AccessRightEnum.MANAGER)
      {
        if(path == "/cashierOperation/checkout" ||
            path == "/cashierOperation/voidRefund" ||
            path == "/cashierOperation/viewMySaleTransactions" ||
            path == "/systemAdministration/createNewStaff" ||
            path.startsWith("/systemAdministration/viewStaffDetails") ||
            path.startsWith("/systemAdministration/updateStaff") ||
            path.startsWith("/systemAdministration/deleteStaff") ||
            path == "/systemAdministration/viewAllStaffs" ||
            path == "/systemAdministration/createNewProduct" ||
            path.startsWith("/systemAdministration/viewProductDetails") ||
            path.startsWith("/systemAdministration/updateProduct") ||
            path.startsWith("/systemAdministration/deleteProduct") ||
            path == "/systemAdministration/viewAllProducts" ||
            path == "/systemAdministration/viewAllProductsPf" ||
            path == "/systemAdministration/searchProductsByName" ||
            path == "/systemAdministration/filterProductsByCategory" ||
            path == "/systemAdministration/filterProductsByTags")
        {
          return true;
        }
        else
        {
          return false;
        }
      }

      return false;
    }
    else
    {
      return false;
    }
  }
}
