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
import { CreateUserReq } from '../models/create-user-req';
import { UpdateProfileReq } from '../models/update-user-req';
import { ChangePasswordReq } from '../models/change-password-req';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = '/api/User';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  userLogin(
    username: string | undefined,
    password: string | undefined
  ): Observable<User> {
    return this.httpClient
      .get<User>(
        this.baseUrl +
          '/userLogin?username=' +
          username +
          '&password=' +
          password
      )
      .pipe(catchError(this.handleError));
  }

  createNewUser(newUser: User): Observable<number> {
    let createUserReq: CreateUserReq = new CreateUserReq(newUser);

    return this.httpClient
      .put<number>(this.baseUrl, createUserReq, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateUser(currUser: User): Observable<any> {
    let updateProfileReq: UpdateProfileReq = new UpdateProfileReq(currUser);

    return this.httpClient
      .post<any>(this.baseUrl + '/updateProfile', updateProfileReq, httpOptions)
      .pipe(catchError(this.handleError));
  }

  changePassword(currUser: User, newPassword: string): Observable<any> {
    let changePasswordReq: ChangePasswordReq = new ChangePasswordReq(
      currUser,
      newPassword
    );

    return this.httpClient
      .post<any>(
        this.baseUrl + '/changePassword',
        changePasswordReq,
        httpOptions
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
