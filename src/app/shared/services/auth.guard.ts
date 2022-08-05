import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private Auth:AuthServiceService
    ,private router:Router){}

canActivate(){
    if(this.Auth.IsLoggedin()){
      return true;
    }
    this.router.navigate(['/login']);

    return false;
    
  }
  
}
