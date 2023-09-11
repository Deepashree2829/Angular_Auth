import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validate-form';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash'
  signupForm: FormGroup =this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required]
  })
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router, 
    private toast: NgToastService) {}
  ngOninit() {}
  hideSHow() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onSubmit() {
    if(this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.authService.signUp(this.signupForm.value).subscribe({
        next: (response: any) => {
          this.signupForm.reset();
          this.toast.success({detail:"SUCCESS",summary: response.message,duration: 5000});
          this.router.navigate(['login']);
        },
        error: (err) => {
          this.toast.error({detail:"ERROR",summary: "Something went wrong",sticky:true});
        }
      })
    } else {
      console.log("Form is not valid");
      ValidateForm.validateAllFormFields(this.signupForm);
      alert("your form is invalid")
    }
  }
}
