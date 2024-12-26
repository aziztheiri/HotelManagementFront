import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.jwt) {
            this.loginMessage = null; // Clear any previous messages
        //    this.router.navigateByUrl('/home'); // Navigate to home page on success
        console.log(res)
          } else {
            this.loginMessage = 'Invalid credentials. Please try again.';
          }
        },
        error: (err) => {
          this.loginMessage = 'An error occurred during login. Please try again.';
        }
      });
    }
  }
}
