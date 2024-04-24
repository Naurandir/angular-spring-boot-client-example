/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createUser } from '../fn/user-controller/create-user';
import { CreateUser$Params } from '../fn/user-controller/create-user';
import { deleteUser } from '../fn/user-controller/delete-user';
import { DeleteUser$Params } from '../fn/user-controller/delete-user';
import { getUser } from '../fn/user-controller/get-user';
import { GetUser$Params } from '../fn/user-controller/get-user';
import { getUsers } from '../fn/user-controller/get-users';
import { GetUsers$Params } from '../fn/user-controller/get-users';
import { UserDto } from '../models/user-dto';

@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getUsers()` */
  static readonly GetUsersPath = '/users';

  /**
   * get all users.
   *
   * get the list of all users
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers$Response(params?: GetUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserDto>>> {
    return getUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * get all users.
   *
   * get the list of all users
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers(params?: GetUsers$Params, context?: HttpContext): Observable<Array<UserDto>> {
    return this.getUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserDto>>): Array<UserDto> => r.body)
    );
  }

  /** Path part for operation `createUser()` */
  static readonly CreateUserPath = '/users';

  /**
   * create a new user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser$Response(params?: CreateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return createUser(this.http, this.rootUrl, params, context);
  }

  /**
   * create a new user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser(params?: CreateUser$Params, context?: HttpContext): Observable<UserDto> {
    return this.createUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `getUser()` */
  static readonly GetUserPath = '/users/{publicId}';

  /**
   * get a specific user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUser$Response(params: GetUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return getUser(this.http, this.rootUrl, params, context);
  }

  /**
   * get a specific user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUser(params: GetUser$Params, context?: HttpContext): Observable<UserDto> {
    return this.getUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `deleteUser()` */
  static readonly DeleteUserPath = '/users/{publicId}';

  /**
   * delete an existing user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params: DeleteUser$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteUser(this.http, this.rootUrl, params, context);
  }

  /**
   * delete an existing user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: DeleteUser$Params, context?: HttpContext): Observable<void> {
    return this.deleteUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
