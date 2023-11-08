import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';

const API_URL = 'http://localhost:8081/api/v1/test'; // Replace with your API URL

@Injectable({
  providedIn: 'root'
})
export class UserService {

  


  constructor(private http: HttpClient) { }

  // public getUser(): Observable<User[]> {
  //   return this.http.get<User[]>(`${API_URL}/api/v1/auth`);
  // }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  // getModeratorBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'mod', { responseType: 'text' });
  // }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
