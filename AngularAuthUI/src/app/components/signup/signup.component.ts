import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private formBuilder: FormBuilder,private authService: AuthService, private router: Router) {

  }
  ngOninit() {

  }
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
          alert(response.message)
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        error: (err) => {
          alert(err?.error.message)
        }
      })
    } else {
      console.log("Form is not valid");
      ValidateForm.validateAllFormFields(this.signupForm);
      alert("your form is invalid")
    }
  }
}
