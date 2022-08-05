import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/components/login/login.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'auth',
    pathMatch: 'full' 
},
{
  path: 'auth',
  component: AuthComponent,
  children:[
      {
          path:'',
          redirectTo: 'login',
          pathMatch: 'full' 
      },
      {
          path:'login',
          component: LoginComponent 
      }
  ]
},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
