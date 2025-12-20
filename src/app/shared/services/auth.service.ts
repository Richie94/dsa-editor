import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Auth, authState, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import {User} from "../model/user";
import {doc, Firestore, setDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    private router: Router,
    public afs: Firestore, // Inject Firestore service
    public afAuth: Auth, // Inject Firebase auth service
  ) {
    authState(this.afAuth).subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.afAuth, email, password)
      .then((result) => {
        // Persist user immediately to avoid race with authState/localStorage updates
        this.userData = result.user;
        try {
          localStorage.setItem('user', JSON.stringify(this.userData));
        } catch (e) {
          // noop: if localStorage fails, authState subscription will still update when possible
        }
        this.setUserData(result.user);
        authState(this.afAuth).subscribe((user) => {
          if (user) {
            this.router.navigate(['hero']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any) {
    const userRef = doc(this.afs, `users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    } as any; // keep shape; app reads it from localStorage
    return setDoc(userRef, userData, { merge: true });
  }

  get isLoggedIn(): boolean {
    let item = localStorage.getItem('user');
    if (item == null) {
      return false;
    }
    const user = JSON.parse(item);
    return user !== null;
  }

  readUser() : any {
    let item = localStorage.getItem('user');
    if (item == null) {
      return null;
    }
    return JSON.parse(item);
  }

  // Sign out
  signOut() {
    return signOut(this.afAuth).then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
