import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  content?: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
      this.userService.getPublicContent().subscribe({
        
        next: (data) => {
          this.content = data;
        },

       error: (err) => {
          this.content = JSON.parse(err.error).mesage;
        }
      });
  }

  
}
