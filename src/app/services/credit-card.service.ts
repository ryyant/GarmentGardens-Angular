import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { SessionService } from '../services/session.service';
import { CreditCard } from "../../app/models/credit-card";
import { Advertiser } from "../../app/models/advertiser";
import { CreateCreditCardReq } from '../models/create-credit-card-req';
import { UpdateCreditCardReq } from '../models/update-credit-card-req';

import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  baseUrl: string = "/api/CreditCard";

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) {
  }

  getCreditCards(): Observable<CreditCard[]> {
    return this.httpClient.get<CreditCard[]>(this.baseUrl + "/retrieveAllCreditCards/" + "?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe
      (
        catchError(this.handleError)
      );
  }

  getCreditCardByCreditCardId(creditCardId: number): Observable<CreditCard> {
    return this.httpClient.get<CreditCard>(this.baseUrl + "/retrieveCreditCard/" + creditCardId + "?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe
      (
        catchError(this.handleError)
      );
  }

  createNewCreditCard(holderName?: string, creditCardNumber?: string, cvv?: string, expiryDate?: Date, billingAddress?: string, user?: User, advertiser?: Advertiser): Observable<CreditCard> {
    let createCreditCardReq: CreateCreditCardReq = new CreateCreditCardReq(this.sessionService.getUsername(), this.sessionService.getPassword(), holderName, creditCardNumber, cvv, expiryDate, billingAddress, user, advertiser);

    return this.httpClient.put<CreditCard>(this.baseUrl, createCreditCardReq, httpOptions).pipe
      (
        catchError(this.handleError)
      );
  }

  updateCreditCard(holderName?: string, creditCardNumber?: string, cvv?: string, expiryDate?: Date, billingAddress?: string, user?: User, advertiser?: Advertiser): Observable<any> {
    let updateCreditCardReq: UpdateCreditCardReq = new UpdateCreditCardReq(this.sessionService.getUsername(), this.sessionService.getPassword(), holderName, creditCardNumber, cvv, expiryDate, billingAddress, user, advertiser);

    return this.httpClient.put<any>(this.baseUrl, updateCreditCardReq, httpOptions).pipe
      (
        catchError(this.handleError)
      );
  }

  deleteCreditCard(creditCardId: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + "/" + creditCardId + "?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe
      (
        catchError(this.handleError)
      );
  }



  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = "An unknown error has occurred: " + error.error;
    }
    else {
      errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
    }

    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }


}
