import { ComponentFactoryResolver, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { CreateDisputeReq } from '../models/create-dispute-req';
import { SessionService } from '../services/session.service';
import { Dispute } from '../models/dispute';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class DisputeService {
  baseUrl: string = '/api/Dispute';

  username: string | undefined;
  password: string | undefined;

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService) { }

  getMyDispute(user: User): Observable<Dispute[]> {
    return this.httpClient
      .get<Dispute[]>(this.baseUrl + '/viewMyDisputes?username=' + user.username).pipe(catchError(this.handleError));
  }

  createNewDispute(dispute: Dispute, orderId: string): Observable<number> {
    let createDisputeReq: CreateDisputeReq = new CreateDisputeReq(
      this.sessionService.getUsername(),
      this.sessionService.getPassword(),
      dispute , orderId, dispute.title, dispute.description
    );

    console.log("This dispute works " + dispute.title);

    return this.httpClient
      .put<number>(this.baseUrl, createDisputeReq, httpOptions)
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
