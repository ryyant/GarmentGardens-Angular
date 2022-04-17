import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from './session.service';
import { CreateRatingReq } from '../models/create-rating-req';
import { LineItem } from '../models/line-item';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { Rating } from '../models/rating';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class RatingResourceService {

  baseUrl: string ="/api/Rating";

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {
  }

  getRatingsForProduct(productId: number): Observable<Rating[]> {
    return this.httpClient.get<Rating[]>(this.baseUrl + "/retrieveRatingsByProductId/" + productId).pipe
    (
      catchError(this.handleError)
    );
  }

  rateProduct(product: Product, rating: Rating): Observable<any> {
    console.log(rating);
    let createRatingReq: CreateRatingReq = new CreateRatingReq(this.sessionService.getCurrentUser(), product, rating);
    return this.httpClient
      .put<any>(this.baseUrl + '/rateProduct', createRatingReq, httpOptions)
      .pipe(catchError(this.handleError));
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
