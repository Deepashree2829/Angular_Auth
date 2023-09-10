import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7025/api/User/"
  constructor(private httpClient: HttpClient) { }

  signUp(userObj: any) {
   return this.httpClient.post(`${this.baseUrl}register`, userObj);
  }
  login(loginObj: any) {
    return this.httpClient.post(`${this.baseUrl}authenticate`, loginObj);
  }
}
