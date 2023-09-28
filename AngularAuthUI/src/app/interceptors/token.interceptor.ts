import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { TokenModel } from '../models/token.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toast: NgToastService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    if(myToken) {
      request = request.clone({
        setHeaders: { Authentication: `Bearer ${myToken}`}
      })
    }
    return next.handle(request).pipe(
      catchError((error: any) => {
        if(error instanceof HttpErrorResponse) {
          if(error.status === 401) {
            // this.toast.warning({detail: "warning", summary: "Token is expired, Login again"});
            // this.router.navigate(['login']);
           return this.handleAuthorizedError(request,next);
          }
        }
        return throwError(() => new Error("Some other error occured"));
      })
    );
  }
  handleAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    let tokenModel = new TokenModel();
    tokenModel.accessToken = this.auth.getToken()!;
    tokenModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokenModel)
    .pipe(
      switchMap((data: TokenModel) => {
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: { Authentication: `Bearer ${data.accessToken}`}
        });
        return next.handle(req);
      }),
      catchError((err) => {
        return throwError(() => {
          this.toast.warning({detail: "warning", summary: "Token is expired, Login again"});
          this.router.navigate(['login']);
        })
      })
    )
  }
}
