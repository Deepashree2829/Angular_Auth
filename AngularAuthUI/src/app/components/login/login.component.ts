import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validate-form';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash'
  loginForm: FormGroup =this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;
  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router, 
    private userStore: UserStoreService,
    private toast: NgToastService) {

  }
  ngOninit() {}
  hideSHow() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onLogin() {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          this.loginForm.reset();
          this.authService.storeToken(response.accessToken);
          this.authService.storeRefreshToken(response.refreshToken);
          let tokenPayload = this.authService.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.toast.success({detail:"SUCCESS",summary: response.message,duration: 5000});
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          this.toast.error({detail:"ERROR",summary: "Something went wrong",duration: 5000});
        }
      })
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("your form is invalid")
    }
  }
  checkValidEmail(event: string) {
    const value = event;
    var pattern = /\S+@\S+\.\S+/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }
  confirmToSend() {
    if(this.checkValidEmail(this.resetPasswordEmail)) {
      console.log(this.resetPasswordEmail);
      this.resetPasswordEmail = "";
      const buttonRef = document.getElementById("closebtn");
      buttonRef?.click();
    }
  }
}
