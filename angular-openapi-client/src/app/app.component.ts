import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { UserListComponent } from "./user/user-list/user-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-openapi-client';
}
