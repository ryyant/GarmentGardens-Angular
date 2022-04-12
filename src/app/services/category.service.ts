import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



import { SessionService } from '../services/session.service';
import { Category } from '../models/category';



const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class CategoryService
{
  baseUrl: string = "/api/Category";


  constructor(private httpClient: HttpClient,
              private sessionService: SessionService)
  {    
  }

  getCategoryByCategoryId(categoryId: number): Observable<Category> {
    return this.httpClient
      .get<Category>(this.baseUrl + '/retrieveCategory/' + categoryId)
      .pipe(catchError(this.handleError));
  }

  getCategories(): Observable<Category[]>
  {		
    return this.httpClient.get<Category[]>(this.baseUrl + "/retrieveAllCategories").pipe
    (
      catchError(this.handleError)
    );
  }

  getRootCategories(): Observable<Category[]>
  {		
    return this.httpClient.get<Category[]>(this.baseUrl + "/retrieveOnlyParentCategories").pipe
    (
      catchError(this.handleError)
    );
  }

  getSubCategories(categoryId : number): Observable<Category[]>
  {	
    return this.httpClient.get<Category[]>(this.baseUrl + "/getSubCategories/" + categoryId).pipe
    (
      catchError(this.handleError)
    );
  }

  getLeafCategories(): Observable<Category[]>
  {		
    return this.httpClient.get<Category[]>(this.baseUrl + "/retrieveAllLeafCategories").pipe
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
