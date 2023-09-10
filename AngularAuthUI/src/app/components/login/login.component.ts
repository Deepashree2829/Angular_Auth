import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validate-form';
import { AuthService } from 'src/app/services/auth.service';

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
  })
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

  }
  ngOninit() {
   
  }
  hideSHow() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onLogin() {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          alert(response.message);
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          alert(err?.error.message)
        }
      })
    } else {
      console.log("Form is not valid");
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("your form is invalid")
    }
  }
}
