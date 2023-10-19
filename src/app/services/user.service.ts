import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = 'http://localhost:8081'; // Replace with your API URL


  constructor(private http: HttpClient) { }

  public getUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/api/v1/auth`);
  }


  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/api/v1/auth`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/api/v1/auth`, user);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/v1/delete/${userId}`);
  }
}
