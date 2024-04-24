import { Component, OnInit } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';

import { lastValueFrom } from 'rxjs';

import { UserDto } from '../../backend/models/user-dto';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  
  users: UserDto[] = [];
  randomMin: number = 1000;
  randomMax: number = 2000;
  
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.refreshUserList();
  }
  
  async refreshUserList() {
    let response = await lastValueFrom(this.userService.getUserList()); // show the usage of lastValueFrom over promise since Angular 16
    this.users = response;
    console.log("found ", this.users.length, " users in the backend");
  }

  async createRandomUser() {
    let random = Math.floor(Math.random() * (this.randomMax - this.randomMin + 1) + this.randomMin);
    let username = "User Random " + random;
    let firstName = "First Name" + random;
    let lastName = "Last Name" + random;

    this.userService.createUser(username, firstName, lastName).subscribe( response => {
      this.refreshUserList();
    });
  }

  deleteUser(publicId: string) {
    this.userService.deleteUser(publicId).subscribe( response => {
      this.refreshUserList();
    });
  }
}
