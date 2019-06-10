import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { IAuthService } from '../i-auth-service';

@Injectable()
export class AuthFirebaseService implements IAuthService {
  token: string;

  constructor(private router: Router) {}

  login(user: string, pass: string, isRemember: boolean) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(user, pass)
        .then(response => {
          this.router.navigate(['/']);
          firebase
            .auth()
            .currentUser.getIdToken()
            .then((token: string) => {
              this.token = token;
              resolve(token);
            });
        })
        .catch(error => reject(error));
    });
  }

  signinUser(email: string, password: string) {
    this.login(email, password, false);
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
