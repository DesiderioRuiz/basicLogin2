import { Injectable } from '@angular/core';

import { AccountService } from 'app/bac-ui-basic-components/account.service';
import { AuthServerProvider } from 'app/bac-ui-basic-components/auth/auth-jwt.service';
import { IAuthService } from 'app/bac-ui-basic-components/i-auth-service';

@Injectable({ providedIn: 'root' })
export class LoginService implements IAuthService {
  constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider) { }

  login(user, pass, remember) {
    const credentials = {
      username: user,
      password: pass,
      rememberMe: remember
    };

    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe(
        data => {
          this.accountService.identity(true).then(account => {
            resolve(data);
          });
        },
        err => {
          this.logout();
          reject(err);
        }
      );
    });
  }

  loginWithToken(jwt, rememberMe) {
    return this.authServerProvider.loginWithToken(jwt, rememberMe);
  }

  logout() {
    this.authServerProvider.logout().subscribe(null, null, () => this.accountService.authenticate(null));
  }
}
