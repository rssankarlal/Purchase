import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { OrderlistComponent } from './components/order/orderlist/orderlist.component';
import { OrderdialogComponent } from './components/order/orderdialog/orderdialog.component';
import { OrderdetaildialogComponent } from './components/order/orderdetaildialog/orderdetaildialog.component';
import { ProductlistComponent } from './components/product/productlist/productlist.component';
import { ProductdialogComponent } from './components/product/productdialog/productdialog.component';
import { SupplierlistComponent } from './components/supplier/supplierlist/supplierlist.component';
import { SupplierdialogComponent } from './components/supplier/supplierdialog/supplierdialog.component';
import { TaxlistComponent } from './components/tax/taxlist/taxlist.component';
import { TaxdialogComponent } from './components/tax/taxdialog/taxdialog.component';
import { CategorylistComponent } from './components/category/categorylist/categorylist.component';
import { CategorydialogComponent } from './components/category/categorydialog/categorydialog.component';
import { GrlistComponent } from './components/goodsreceipt/grlist/grlist.component';
import { GrdialogComponent } from './components/goodsreceipt/grdialog/grdialog.component';



import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatTreeModule} from '@angular/material/tree';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { NavtreeComponent } from './components/common/navtree/navtree.component';
import { HomeComponent } from './components/common/home/home.component';



@NgModule({
  declarations: [
    UserComponent,
    OrderlistComponent,
    OrderdialogComponent,
    OrderdetaildialogComponent,
    ProductlistComponent,
    ProductdialogComponent,
    SupplierlistComponent,
    SupplierdialogComponent,
    TaxlistComponent,
    TaxdialogComponent,
    CategorylistComponent,
    CategorydialogComponent,
    GrlistComponent,
    GrdialogComponent,
    NavbarComponent,
    NavtreeComponent,
    HomeComponent,
    
    
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTreeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule
    
    

  ],
  providers: []
})
export class UserModule { }
