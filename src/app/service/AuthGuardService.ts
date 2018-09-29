import { Router, CanActivate } from '@angular/router';
import {AuthenticationService} from "./AuthenticationService";
import {Injectable} from "@angular/core";


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('index');
      return false;
    }
    return true;
  }
}
