import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  IsLoggedin(){
    debugger;
    return !! localStorage.getItem("isLoggedIn")
  }
   
}
