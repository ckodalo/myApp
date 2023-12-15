import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

import { Observable, Observer } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  navigateToSignUp() {
    this.router.navigate(['/account-creation']);
  }
  
  validateForm: FormGroup<{
    userName: FormControl<string>;
    mobile: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirm: FormControl<string>;
  }>;

  autoTips: Record<string, Record<string, string>> = {
    en: {
      required: 'Input is required'
    },
    default: {
      email: 'The input is not valid email'
    }
  };

   isSuccessful = false;
   isRegisteredFailed = false;
   errorMessage = '';

   constructor(private router: Router, private authService: AuthService, private fb: NonNullableFormBuilder) {

        // use `MyValidators`
        const { required, maxLength, minLength, email, mobile } = MyValidators;
        this.validateForm = this.fb.group({
          userName: ['', [required, maxLength(12), minLength(6)], [this.userNameAsyncValidator]],
          mobile: ['', [required, mobile]],
          email: ['', [required, email]],
          password: ['', [required]],
          confirm: ['', [this.confirmValidator]]
       });
      }

    validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator: AsyncValidatorFn = (control: AbstractControl) =>
    new Observable((observer: Observer<MyValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({
            duplicated: { 'zh-cn': `用户名已存在`, en: `The username is redundant!` }
          });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

   ngOnInit(): void {

   }

   submitForm(): void {
    
    const userNameControl = this.validateForm.get('userName')
    const passwordControl = this.validateForm.get('password')
    const emailControl = this.validateForm.get('email')

    if (this.validateForm.valid && userNameControl && passwordControl && emailControl) {

      console.log('submit', this.validateForm.value);

      const userName = userNameControl.value;
      const password = passwordControl.value;
      const email = emailControl.value;

      this.authService.register(userName, password, email).subscribe({

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
  
}

export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static override minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `最小长度为 ${minLength}`, en: `MinLength is ${minLength}` } };
    };
  }

  static override maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `最大长度为 ${maxLength}`, en: `MaxLength is ${maxLength}` } };
    };
  }

  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value)
      ? null
      : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Mobile phone number is not valid` } };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}


