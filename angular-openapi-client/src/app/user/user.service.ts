import { Injectable } from '@angular/core';
import { UserDto } from '../backend/models/user-dto';
import { Observable } from 'rxjs';

import { UserControllerService } from '../backend/services/user-controller.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userControllerService: UserControllerService) { }

  getUserList(): Observable<Array<UserDto>> {
    console.log("reading list of users from backend...");
    return this.userControllerService.getUsers();
  }

  createUser(username: string, firstName: string, lastName: string): Observable<UserDto> {
    console.log("create new user with data: ", username, firstName, lastName);
    
    let params = {
      "body": {
        "username": username,
        "firstName": firstName,
        "lastName": lastName
      }
    };

    return this.userControllerService.createUser(params);
  }

  deleteUser(publicId: string): Observable<void> {
    console.log("deleting user ", publicId, " from backend...");
    
    let params = {
      "publicId": publicId
    };
    
    return this.userControllerService.deleteUser(params);
  }
}
