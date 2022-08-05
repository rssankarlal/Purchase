import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder ,FormGroup,Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { NotificationserviceService } from 'src/app/shared/services/notificationservice.service';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() loginstatus:any;
  loading = false;
  public loginForm!:FormGroup
  error:any;
  returnUrl: any;
  constructor(
    private formBuilder:FormBuilder,private http:HttpClient,private router:Router,
    private route: ActivatedRoute,
    private notificationService: NotificationserviceService,
    private AuthService:AuthServiceService

  ) { }

  ngOnInit(): void {
debugger;
    localStorage.removeItem("isLoggedIn");

    //  this.initForm();
    this.loginForm=this.formBuilder.group({
     email:['',Validators.required],
     password:['',Validators.required]
   
   })
   
  }

  login(){
    debugger;
    if(this.loginForm.valid){
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
    console.log(res);
      const user=res.find((a:any)=>{

        return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password
      });
      if(user){
        debugger
        //alert("Login Success");
        this.notificationService.success(':: Login Success');

        localStorage.setItem('isLoggedIn',"true") ;
        this.loginstatus="true"
        this.loginForm.reset();
        this.router.navigate(['/user/home'])
      }
      else{
        //localStorage.setItem('isLoggedIn',"false") ;
        localStorage.removeItem("isLoggedIn");
        //alert("user not fount")
        this.notificationService.warn(':: user not fount');
      }
    
      },err=>{
        //localStorage.setItem('isLoggedIn',"false") ;
        localStorage.removeItem("isLoggedIn");
        alert("something went wrong")
      }
   
    )
    }
  }

}
