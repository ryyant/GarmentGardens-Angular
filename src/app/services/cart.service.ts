import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from '../services/session.service';
import { User } from '../models/user';
import { UpdateCartReq } from '../models/update-cart-req';
import { Product } from '../models/product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl: string = '/api/Cart';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) { }

  addToCart(productToAdd: Product, qtyToAdd: number): Observable<any> {
    let updateCartReq: UpdateCartReq = new UpdateCartReq(productToAdd, qtyToAdd, this.sessionService.getCurrentUser());

    return this.httpClient
      .post<any>(this.baseUrl + '/addToCart', updateCartReq, httpOptions)
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
