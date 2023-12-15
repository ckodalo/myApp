import { Component, forwardRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // form: any = {
  //   username: null,
  //   password: null
  // };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });


  constructor(private fb: NonNullableFormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService) { }
  
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  submitForm(): void {
    const userNameControl = this.validateForm.get('userName')
    const passwordControl = this.validateForm.get('password')
    const rememberControl = this.validateForm.get('remember')


    if (this.validateForm.valid && userNameControl && passwordControl && rememberControl) {
      const userName = userNameControl.value;
      const password = passwordControl.value;
      const remember = rememberControl.value;
  
      console.log('submit', this.validateForm.value);
  
      this.authService.login(userName, password).subscribe({
       next: (data) => {
          //if (data) {
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);
  
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
            this.reloadPage();
       //   } else {
            // Handle the case where data is null or undefined
          },
        //},
       error: (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
    });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      })
    }

  
   
  }


  reloadPage(): void {
    window.location.reload();
  }

}
