import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoleService } from 'src/app/interactiva/post-login/role-check/shared/role.service';


@Injectable({
  providedIn: 'root'
})
export class ServiceGuard implements CanActivate {

  constructor(private roleService: RoleService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.roleService.getClientServices().pipe(map(result=>{
        return result.some(x => x[route.data.serviceRequired] === true);
      }))
  }

}
