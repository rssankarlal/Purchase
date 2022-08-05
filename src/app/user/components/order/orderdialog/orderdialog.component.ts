import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import { NotificationserviceService } from 'src/app/shared/services/notificationservice.service';
import { OrderheadService } from 'src/app/shared/services/orderhead.service';
import { OrderdetailService } from 'src/app/shared/services/orderdetail.service';
import { orderhead } from 'src/app/shared/models/orderhead';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import {MatTableDataSource} from '@angular/material/table';
import { OrderdetaildialogComponent } from '../orderdetaildialog/orderdetaildialog.component';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
  selector: 'app-orderdialog',
  templateUrl: './orderdialog.component.html',
  styleUrls: ['./orderdialog.component.css']
})
export class OrderdialogComponent implements OnInit {

  orderid:any;
  additembutton:any;
  formTitle:any;
  orderObject:orderhead=new orderhead();
  orderForm!:FormGroup;
  actionBtn:string="Save";
  supplierlist:any;
  orderheadId:any;
  DetaildisplayedColumns:string[]=['orderheadId','productname','qty','rate','amount','taxper','totalamount','Action']
  //DetaildisplayedColumns:string[]=['id','Action']
  DetaildataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formBuilder:FormBuilder,
    private matSnackBar: MatSnackBar,
    private notificationService: NotificationserviceService,
    private orderService:OrderheadService,
    private orderDetService:OrderdetailService,
    private SuppService:SupplierService,
    @Inject(MAT_DIALOG_DATA)public editData:any,
    private orderdialogRef :MatDialogRef<OrderdialogComponent>,
    private OrderdetailDialog:MatDialog,
    private shared:SharedService
    ,private prodService:ProductService

  ) { }

  ngOnInit(): void {

    this.additembutton=true,
  this.getAllSuppliers();
  //this.getAllOrderDetail();
  this.formTitle="New Purchase Order";
    this.orderForm=this.formBuilder.group({

      
      // productID:['',Validators.required],
      id:[0],
      orderid:[0],
      supplierId:['',Validators.required],
      supplierName:['',Validators.required],
      orderDate:['',Validators.required],
      dueDate:['',Validators.required],
     
     })
     this.orderForm.controls['id'].disable();
     if(this.editData){
       debugger;
      this.additembutton=false,
      this.actionBtn="Update"
      this.formTitle="Modify Purchase Order";
      this.orderForm.controls['id'].disable();
    //  this.productForm.controls['productID'].setValue(this.editData.productID);
      this.orderForm.controls['id'].setValue(this.editData.id);
      this.orderForm.controls['supplierName'].setValue(this.editData.supplierName);
      this.orderheadId=this.editData.id;
      this.shared.SetOrderHeadId(this.editData.id);
      this.orderid=this.editData.id;
      debugger;
      this.getOrderDetailById(this.editData.id);
      //this.getOrderDetail();
      this.orderForm.controls['orderid'].setValue(this.editData.id);
      this.orderForm.controls['supplierId'].setValue(this.editData.supplierId);
      this.orderForm.controls['orderDate'].setValue(this.editData.orderDate);
      this.orderForm.controls['dueDate'].setValue(this.editData.dueDate);
    }
  }

  
  getOrderDetailById1(Id:number){
    debugger;
    this.orderDetService.getorderdetailbyId(Id)
    .subscribe(orderdet=>{
      debugger;
      this.DetaildataSource=new MatTableDataSource(orderdet)
      this.DetaildataSource.paginator=this.paginator;
      this.DetaildataSource.sort=this.sort;
   })
  }
  

  getOrderDetail(){
    this.orderDetService.getorderdetail()
       .subscribe({
      next:(res)=>{
        debugger;
       
        this.DetaildataSource=new MatTableDataSource(res)
        this.DetaildataSource.paginator=this.paginator;
        this.DetaildataSource.sort=this.sort;
       
      },
      error:(err)=>{
        alert("error while fetching data");
      }
    })
  }
  SupplierChange(event:any,supplier:any){
    debugger;
    if (event.isUserInput==true) {
      this.orderForm.controls['supplierName'].setValue(supplier.SupplierName);
    }
  }
  getOrderDetailById(Id:number){
    debugger;
    this.orderDetService.getorderdetailbyId(Id)
       .subscribe({
      next:(res)=>{
        debugger;
     
       debugger;
        this.DetaildataSource=new MatTableDataSource(res)
        this.DetaildataSource.paginator=this.paginator;
        this.DetaildataSource.sort=this.sort;
       
      },
      error:(err)=>{
        alert("error while fetching data");
      }
    })
  }

  addorder(){
    debugger;
    if(this.orderForm.valid){
      this.orderObject.id=this.orderForm.value.id;
      this.orderObject.supplierId=this.orderForm.value.supplierId;
      this.orderObject.supplierName=this.orderForm.value.supplierName;
      this.orderObject.orderDate=this.orderForm.value.orderDate;
      this.orderObject.dueDate=this.orderForm.value.dueDate;

    if(!this.editData)
    {
     
        console.log('check')
        console.log(this.orderForm.value)
        this.orderService.postOrderHead(this.orderObject)
        .subscribe({
          next:(res)=>{
          debugger;
          this.shared.SetOrderHeadId(res.id);
          this.orderheadId=res.id;
          this.orderForm.controls['id'].setValue(res.id);
          //
            this.notificationService.success(':: Order added successfully');
            //alert("supplier added successfully")
            //this.orderForm.reset();
            //this.orderdialogRef.close('save');
            this.additembutton=false
          },
          error:()=>{
            alert("error while adding Order")
          }
        })
       //}
    }
    else{
      this.updateOrder()
    }
  }
   
}
updateOrder(){
  console.log('check')
  this.orderService.putOrderHead(this.orderObject,this.editData.id)
  .subscribe({
    next:(res)=>{
      
      this.notificationService.success(':: Order Updated successfully');
      this.orderForm.reset();
      this.orderdialogRef.close('update');
      this.additembutton=false
    },
    error:()=>{
      alert("error while updating supplier")
    }
  })
}
onClose() {
  this.orderForm.reset();
  this.orderdialogRef.close();
}


  getAllSuppliers(){
    this.SuppService.getSupplier()
   
    .subscribe({
      next:(res)=>{
        this.supplierlist=res;
      },
      error:(err)=>{
        alert("error while fetching data");
      }
    })
  }

  addorderdetail(){

  }
  openDetailDialog(){
debugger;
this.shared.SetOrderHeadId(this.orderheadId)
    this.OrderdetailDialog.open(OrderdetaildialogComponent, {disableClose: true,
      width:'60%',height:'60%',
    }).afterClosed().subscribe(val=>{
      if (val ==='save'){
        debugger;
        this.getOrderDetailById(this.orderheadId);
      }
    });

  }
  editOrderDetail(row:any){
debugger;
    this.OrderdetailDialog.open(OrderdetaildialogComponent,{disableClose: true,
      width:'60%',height:'60%',
      data:row
    }).afterClosed().subscribe(val=>{
      if (val ==='update'){
        this.getOrderDetailById(this.orderheadId);
      }
    });

  }
  deleteOrderDetail(id:number){
    debugger
    this.orderDetService.deleteOrderdetail(id)
    .subscribe({
      next:(res)=>{
        debugger;
        this.getOrderDetailById(this.orderheadId);
        this.notificationService.warn('.! Order detail Deleted successfully');
      },
      error:()=>{
        //alert("error while deleting record")
        this.notificationService.warn('error while deleting record');
      }
    })
  }


}
