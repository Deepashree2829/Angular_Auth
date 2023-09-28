import {  Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { NgToastService } from "ng-angular-popup";


export class AuthGuard {
  constructor(private auth: AuthService, private router: Router, private toast: NgToastService) {}

  canActivate():boolean {
    if(this.auth.isLoggedIn()) {
      return true;
    } else {
      this.toast.error({detail: "ERROR", summary: "Please Login First!"})
      this.router.navigate(['login']);
      return false;
    }
  }
}