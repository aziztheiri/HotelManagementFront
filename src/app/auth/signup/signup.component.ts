import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!: FormGroup;
  message: string = ''; // Message to display status
  messageType: 'success' | 'error' | '' = ''; // Type of message (success or error)
  constructor(private fb: FormBuilder,private authService :AuthService,private router : Router ) {
 
  }
ngOnInit(){
  this.signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
}
onSubmit(): void {
  if (this.signupForm.valid) {
    this.authService.register(this.signupForm.value).subscribe(
      
      (res) => {
        if (res && res.id != null) {
          console.log(this.signupForm.value)
          this.message = 'Sign-up successful! Redirecting to home page...';
          this.messageType = 'success';
          setTimeout(() => this.router.navigateByUrl('/home'), 3000);
        } else {
          this.message = 'Sign-up failed. Please try again.';
          this.messageType = 'error';
        }
      },
      (error) => {
        this.message = 'An error occurred during sign-up. Please try again.';
        this.messageType = 'error';
      }
    );
  } else {
    this.message = 'Please fill out the form correctly.';
    this.messageType = 'error';
  }
}
}
