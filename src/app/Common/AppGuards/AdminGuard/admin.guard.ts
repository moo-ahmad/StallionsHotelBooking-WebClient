import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../AppServices/TokenService/token.service';
import { Roles } from '../../Enums/roles.enum';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private tokenService: TokenService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let session = this.tokenService.getSession();
      let userRole = this.tokenService.getUserRole(session?.token as string);
      if(userRole !== Roles.Admin) {
        this.router.navigate(['Auth/unauthorized']);
        return false;
      }
      return true;
  }
  
}
