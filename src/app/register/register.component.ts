import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
   form: any = {
    username: null,
    email: null,
    password:null
   };

   isSuccessful = false;
   isRegisteredFailed = false;
   errorMessage = '';

   constructor(private authService: AuthService) {}

   ngOnInit(): void {

   }

   onSubmit(): void {
    const {username, email, password} = this.form;

    this.authService.register(username, email, password).subscribe({

      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isRegisteredFailed = false; 
      },

      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isRegisteredFailed = true;
      },

     })
   }
}
