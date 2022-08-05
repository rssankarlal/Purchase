import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { HomeComponent } from './components/common/home/home.component';
import { TaxlistComponent } from './components/tax/taxlist/taxlist.component';
import { ProductlistComponent } from './components/product/productlist/productlist.component';
import { SupplierlistComponent } from './components/supplier/supplierlist/supplierlist.component';
import { CategorylistComponent } from './components/category/categorylist/categorylist.component';
import { OrderlistComponent } from './components/order/orderlist/orderlist.component';
import { GrlistComponent } from './components/goodsreceipt/grlist/grlist.component';
import { AuthGuard } from '../shared/services/auth.guard';
const routes: Routes = [
  {

    path:'user',component:UserComponent,

    children:[

      { path:'home',component:HomeComponent,canActivate:[AuthGuard]},
      { path:'category',component:CategorylistComponent,canActivate:[AuthGuard]},
      { path:'products',component:ProductlistComponent,canActivate:[AuthGuard]},
      { path:'suppliers',component:SupplierlistComponent,canActivate:[AuthGuard]},
      { path:'tax',component:TaxlistComponent,canActivate:[AuthGuard]},
      { path:'purchase',component:OrderlistComponent,canActivate:[AuthGuard]},
      { path:'goodsreceipt',component:GrlistComponent,canActivate:[AuthGuard]},
  
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
