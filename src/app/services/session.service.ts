import { Injectable } from '@angular/core';

import { RoleEnum } from '../models/role-enum';
import { User } from '../models/user';
import { MessageOfTheDay } from '../models/message-of-the-day';
import { CreditCard } from '../models/credit-card';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  setRecommendedSize(size: string): void {
    sessionStorage['recommendedSize'] = size;
  }

  getRecommendedSize(): string {
    return sessionStorage['recommendedSize']
  }


  setChlorophyll(chloro: number | undefined): void {
    sessionStorage['chlorophyll'] = chloro;
  }

  getChlorophyll(): number {
    return sessionStorage['chlorophyll']
  }

  addChlorophyll(toAdd: number): void {
    sessionStorage['chlorophyll'] = parseInt(sessionStorage['chlorophyll']) + toAdd;
  }

  deductChlorophyll(toDeduct: number): void {
    sessionStorage['chlorophyll'] = parseInt(sessionStorage['chlorophyll']) - toDeduct;
  }

  getIsLogin(): boolean {
    if (sessionStorage['isLogin'] == 'true') {
      return true;
    } else {
      return false;
    }
  }

  setIsLogin(isLogin: boolean): void {
    sessionStorage['isLogin'] = isLogin;
  }



  getMotds(): MessageOfTheDay[] {
    return JSON.parse(sessionStorage['motds']);
  }

  setMotds(motds: MessageOfTheDay[]): void {
    sessionStorage['motds'] = JSON.stringify(motds);
  }

  getCurrentUser(): User {
    return JSON.parse(sessionStorage['currentUser']);
  }

  setCurrentUser(currentUser: User | null): void {
    sessionStorage['currentUser'] = JSON.stringify(currentUser);
  }

  getUserId(): number {
    return sessionStorage['userId'];
  }

  setUserId(): number {
    return sessionStorage['userId'];
  }

  getUsername(): string {
    return sessionStorage['username'];
  }

  setUsername(username: string | undefined): void {
    sessionStorage['username'] = username;
  }

  getPassword(): string {
    return sessionStorage['password'];
  }

  setPassword(password: string | undefined): void {
    sessionStorage['password'] = password;
  }

  getCreditCard(): CreditCard | undefined {
    const creditCard = sessionStorage.getItem('creditCard');

    if (typeof creditCard === 'string') {
      return JSON.parse(creditCard);
    } else {
      return undefined;
    }
  }

  setCreditCard(creditCard: CreditCard): void {
    sessionStorage.setItem('creditCard', JSON.stringify(creditCard));
  }

  checkAccessRight(path: string): boolean {
    console.log('********** path: ' + path);

    if (this.getIsLogin()) {
      let user: User = this.getCurrentUser();

      if (user.role == RoleEnum.CUSTOMER) {
        if (
          path == '/cashierOperation/checkout' ||
          path == '/cashierOperation/voidRefund' ||
          path == '/systemAdministration/viewProfilePage' ||
          path == '/cashierOperation/viewMySaleTransactions' ||
          path == '/systemAdministration/viewDisputes'
        ) {
          return true;
        } else {
          return false;
        }
      }
      else if (user.role == RoleEnum.SELLER) {
        if (path == "/systemAdministration/viewProfilePage" ||
          path == "/systemAdministration/viewSellerProducts" ||
          path == "/systemAdministration/createNewProduct" ||
          path.startsWith("/systemAdministration/updateProduct") ||
          path.startsWith("/systemAdministration/deleteProduct") ||
          path == "/systemAdministration/viewDisputes") {
          return true;
        } else {
          return false;
        }
      }

      return false;
    } else {
      return false;
    }
  }
}
