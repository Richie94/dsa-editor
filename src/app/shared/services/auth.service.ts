import {Injectable} from '@angular/core';
import {User} from "../model/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: User | undefined;

  constructor(
    private router: Router
  ) {
    this.userData = JSON.parse(localStorage.getItem('user')!)
  }

  signIn(email: string, password: string) {
    if (email == "test" && password == "test") {
      this.userData = {
        uid: "test",
        email: "test",
        displayName: "test",
        photoURL: "test",
        emailVerified: true
      }
      localStorage.setItem('user', JSON.stringify(this.userData))
      this.router.navigate(['hero'])
    } else {
      this.userData = undefined
      localStorage.removeItem('user')
    }
  }

  get isLoggedIn(): boolean {
    let item = localStorage.getItem('user');
    if (item == null) {
      return false;
    }
    const user = JSON.parse(item);
    return user !== null;
  }
}
