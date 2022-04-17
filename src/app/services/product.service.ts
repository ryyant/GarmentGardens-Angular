import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';

import { SessionService } from '../services/session.service';
import { Product } from '../models/product';
import { CreateProductReq } from '../models/create-product-req';
import { UpdateProductReq } from '../models/update-product-req';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = '/api/Product';

  username: string | undefined;
  password: string | undefined;

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(this.baseUrl + '/retrieveAllProducts')
      .pipe(catchError(this.handleError));
  }


  getSellerProducts(user: User): Observable<Product[]> {
    
    return this.httpClient
      .get<Product[]>(this.baseUrl + '/retrieveAllSellerProducts/' + user.userId).pipe(catchError(this.handleError));
  }

  getFilteredProducts(categoryId: number): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(
        this.baseUrl + '/retrieveAllProductsFiltered/' + categoryId
      )
      .pipe(catchError(this.handleError));
  }

  getProductByProductId(productId: number): Observable<Product> {
    return this.httpClient
      .get<Product>(this.baseUrl + '/retrieveProduct/' + productId)
      .pipe(catchError(this.handleError));
  }

  createNewProduct(
    newProduct: Product,
    categoryId: number | null,
    tagIds: number[]
  ): Observable<number> {
    let createProductReq: CreateProductReq = new CreateProductReq(
      this.sessionService.getUsername(),
      this.sessionService.getPassword(),
      newProduct,
      categoryId,
      tagIds
    );

    console.log("ProductService.New Product ID: " + newProduct.productId);

    return this.httpClient
      .put<number>(this.baseUrl, createProductReq, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateProduct(
    productToUpdate: Product,
    categoryId: number | undefined | null,
    tagIds: number[]
  ): Observable<any> {
    let updateProductReq: UpdateProductReq = new UpdateProductReq(
      this.sessionService.getUsername(),
      this.sessionService.getPassword(),
      productToUpdate,
      categoryId,
      tagIds
    );

    return this.httpClient
      .post<any>(this.baseUrl, updateProductReq, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteProduct(productId: number): Observable<any> {
    return this.httpClient
      .delete<any>(
        this.baseUrl +
          '/' +
          productId +
          '?username=' +
          this.sessionService.getUsername() +
          '&password=' +
          this.sessionService.getPassword()
      )
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
