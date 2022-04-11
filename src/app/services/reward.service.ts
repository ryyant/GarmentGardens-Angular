import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from '../services/session.service';
import { Reward } from '../models/reward';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  baseUrl: string = "/api/Reward";

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) {
  }

  getRewards(): Observable<Reward[]> {
    return this.httpClient.get<Reward[]>(this.baseUrl + "/retrieveAllRewards/").pipe
    (
      catchError(this.handleError)
    );
  }

  getRewardByRewardId(rewardId: number): Observable<Reward> {
    return this.httpClient.get<Reward>(this.baseUrl + "/retrieveReward/" + rewardId).pipe
    (
      catchError(this.handleError)
    );
  }



  private handleError(error: HttpErrorResponse)
  {
    let errorMessage: string = "";
    
    if (error.error instanceof ErrorEvent) 
    {		
      errorMessage = "An unknown error has occurred: " + error.error;
    } 
    else 
    {		
      errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
    }
    
    console.error(errorMessage);
    
    return throwError(() => new Error(errorMessage));
  }
  
}