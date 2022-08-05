import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationserviceService } from 'src/app/shared/services/notificationservice.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router
    , private notificationService: NotificationserviceService,) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      fullname:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      mobile:['',Validators.required],
    })
  }
  signUp(){
    if(this.signupForm.valid){
    this.http.post<any>("http://localhost:3000/signupUsers",this.signupForm.value)
    .subscribe(res=>{
      //alert("signup successfully");
      this.notificationService.success(':: Signup Successfully');
      this.signupForm.reset();
      this.router.navigate(['login']);
    },err=>{
      //alert("something went wrong")
      this.notificationService.warn(':: something went wrong');
    })
  }
  }

}
