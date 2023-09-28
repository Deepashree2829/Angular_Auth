import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenModel } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7025/api/User/";
  userPayload: any;
  constructor(private httpClient: HttpClient, private router: Router) { 
    this.userPayload = this.decodedToken();
  }

  signUp(userObj: any) {
   return this.httpClient.post(`${this.baseUrl}register`, userObj);
  }
  login(loginObj: any) {
    return this.httpClient.post(`${this.baseUrl}authenticate`, loginObj);
  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }
  storeRefreshToken(refreshTokenValue: string) {
    localStorage.setItem('refreshToken', refreshTokenValue);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logout() {
    localStorage.clear();
    // localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }
  getFullNameFromToken() {
    if(this.userPayload) {
      return this.userPayload.unique_name;
    }
  }
  getRoleFromToken() {
    if(this.userPayload) {
      return this.userPayload.role;
    }
  }
  renewToken(tokenApi: TokenModel) {
    return this.httpClient.post<any>(`${this.baseUrl}refresh`, tokenApi)
  }
}
