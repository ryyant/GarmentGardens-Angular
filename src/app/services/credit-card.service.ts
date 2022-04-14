import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from '../services/session.service';
import { CreditCard } from '../../app/models/credit-card';
import { Advertiser } from '../../app/models/advertiser';
import { CreateCreditCardReq } from '../models/create-credit-card-req';

import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  baseUrl: string = '/api/CreditCard';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  getCreditCards(): Observable<CreditCard[]> {
    return this.httpClient
      .get<CreditCard[]>(
        this.baseUrl +
          '/retrieveAllCreditCards/' +
          '?username=' +
          this.sessionService.getUsername() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  getCreditCardByCreditCardId(creditCardId: number): Observable<CreditCard> {
    return this.httpClient
      .get<CreditCard>(
        this.baseUrl +
          '/retrieveCreditCard/' +
          creditCardId +
          '?username=' +
          this.sessionService.getUsername() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  createNewCreditCard(newCC?: CreditCard): Observable<number> {
    let createCreditCardReq: CreateCreditCardReq = new CreateCreditCardReq(
      newCC,
      this.sessionService.getUsername(),
      this.sessionService.getPassword()
    );

    return this.httpClient
      .put<number>(this.baseUrl, createCreditCardReq, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteCreditCard(userId: number, creditCardId: number): Observable<any> {
    return this.httpClient
      .delete<any>(this.baseUrl + '/' + userId + '/' + creditCardId)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = 'An unknown error has occurred: ' + error.error;
    } else {
      errorMessage =
        'A HTTP error has occurred: ' + `HTTP ${error.status}: ${error.error}`;
    }

    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
