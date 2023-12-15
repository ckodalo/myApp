import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzFormModule } from 'ng-zorro-antd/form'
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzCarouselModule} from 'ng-zorro-antd/carousel';
import {NzRadioModule} from 'ng-zorro-antd/radio';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import {authInterceptorProviders} from './helpers/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselComponent } from './carousel/carousel.component';
import { SendMoneyComponent } from './send-money/send-money.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { UpcomingFeaturesComponent } from './upcoming-features/upcoming-features.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    AdminComponent,
    CarouselComponent,
    SendMoneyComponent,
    HeroSectionComponent,
    UpcomingFeaturesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NzButtonModule,
    NzFormModule,
    NzLayoutModule,
    NzIconModule,
    NzInputModule,
    NzMenuModule,
    NzCarouselModule,
    NzRadioModule,
    ReactiveFormsModule
    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
