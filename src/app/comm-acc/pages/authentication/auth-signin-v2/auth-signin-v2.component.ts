// Angular import
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AuthenticationService } from 'src/app/theme/shared/service/authentication.service';

@Component({
  selector: 'app-auth-signin-v2',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './auth-signin-v2.component.html',
  styleUrls: ['./auth-signin-v2.component.scss']
})
export default class AuthSigninV2Component implements OnInit {
  // public method
  usernameValue = '';
  userPassword = '';

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  alertType = '';
  alertMsg = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.isLoggedIn) {
      console.log('AuthSigninV2Component - isLoggedIn');
      this.authenticationService.logout();
    } else {
        console.log('AuthSigninV2Component - NOT logged In');
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');

    togglePassword?.addEventListener('click', () => {
      // toggle the type attribute
      const type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
      password?.setAttribute('type', type);


      // toggle the icon
      togglePassword.classList.toggle('icon-eye-slash');
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  register() {

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/analytics';
    this.authenticationService.login(this.f?.['username']?.value, this.f?.['password']?.value, returnUrl)
        .then(() => {

        })
        .catch((err) => {
            this.alertType = 'danger';
            this.alertMsg = err.message;
        });
  }
}
