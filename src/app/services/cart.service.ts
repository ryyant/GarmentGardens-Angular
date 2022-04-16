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
import { LineItem } from '../models/line-item';
import { Cart } from '../models/cart';
import { Order } from '../models/order';
import { RemoveLineItemReq } from '../models/remove-line-item-req';

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
    let updateCartReq: UpdateCartReq = new UpdateCartReq(productToAdd, qtyToAdd, "", this.sessionService.getCurrentUser());
    return this.httpClient
      .post<any>(this.baseUrl + '/addToCart', updateCartReq, httpOptions)
      .pipe(catchError(this.handleError));
  }

  checkout(promoCode: string): Observable<any> {
    let updateCartReq: UpdateCartReq = new UpdateCartReq(undefined, 0, promoCode, this.sessionService.getCurrentUser());
    return this.httpClient
      .post<any>(this.baseUrl + '/checkout', updateCartReq, httpOptions)
      .pipe(catchError(this.handleError));
  }

  retrieveMyCart(user: User) : Observable<Cart> {
    return this.httpClient.get<Cart>(this.baseUrl + '/retrieveMyCart/' + user.userId).pipe(catchError(this.handleError));
  }

  retrieveMyOrders(user: User) : Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.baseUrl + '/retrieveMyOrders/' + user.userId).pipe(catchError(this.handleError));
  }
  
  removeLineItem(lineItemToRemove: LineItem): Observable<any> {
    let removeLineItemReq: RemoveLineItemReq = new RemoveLineItemReq(lineItemToRemove, this.sessionService.getCurrentUser(), false);
    return this.httpClient
      .post<any>(this.baseUrl + '/removeCartLineItem', removeLineItemReq, httpOptions)
      .pipe(catchError(this.handleError));
  }

  clearCart(): Observable<any> {
    let removeLineItemReq: RemoveLineItemReq = new RemoveLineItemReq(undefined, this.sessionService.getCurrentUser(), true);
    return this.httpClient
      .post<any>(this.baseUrl + '/clearCart', removeLineItemReq, httpOptions)
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
