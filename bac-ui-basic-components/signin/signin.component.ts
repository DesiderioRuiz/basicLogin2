import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

// import { AuthFirebaseService } from '../auth.firebase.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IAuthService } from '../i-auth-service';
import { LoginService } from 'app/bac-ui-basic-components/login.service';
import { JhiEventManager } from 'ng-jhipster';
import { StateStorageService } from 'app/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent {
  authenticationError: boolean;
  iAuthService: IAuthService;
  submitted = false;

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    rememberMe: [true]
  });

  constructor(
    private formBuilder: FormBuilder,
    private stateStorageService: StateStorageService,
    private eventManager: JhiEventManager,
    private router: Router,
    public activeModal: NgbActiveModal,
    private loginService: LoginService
  ) {
    // this.iAuthService = new AuthFirebaseService(router);
    this.iAuthService = loginService;
  }

  get f() {
    return this.loginForm.controls;
  }

  onSignin() {
    this.submitted = true;
    this.iAuthService
      .login(this.f.username.value, this.f.password.value, this.f.rememberMe.value)
      .then(() => {
        this.authenticationError = false;
        this.activeModal.dismiss('login success');
        if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
          this.router.navigate(['']);
        }

        this.eventManager.broadcast({
          name: 'authenticationSuccess',
          content: 'Sending Authentication Success'
        });

        const redirect = this.stateStorageService.getUrl();
        if (redirect) {
          this.stateStorageService.storeUrl(null);
          this.router.navigateByUrl(redirect);
        }
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }

  register() {
    this.activeModal.dismiss('to state register');
    this.router.navigate(['/register']);
  }
}
