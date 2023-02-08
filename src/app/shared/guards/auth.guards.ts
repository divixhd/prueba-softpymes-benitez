import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginServiceService } from 'src/app/login-service.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private sessionService:LoginServiceService) { }

    canActivate() {
        if (this.sessionService.isAuth()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}