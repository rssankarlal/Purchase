import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { NotificationserviceService } from 'src/app/shared/services/notificationservice.service';
import { GoodsreceiptdetailService } from 'src/app/shared/services/goodsreceiptdetail.service';
import { GoodsreceiptService } from 'src/app/shared/services/goodsreceipt.service';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import {MatTableDataSource} from '@angular/material/table';
import { orderhead } from 'src/app/shared/models/orderhead';
import { orderdetail } from 'src/app/shared/models/orderdetail';
import { GoodsReceipt } from 'src/app/shared/models/goodreceipt';
import { GoodsReceiptDetail } from 'src/app/shared/models/GoodsReceiptDetail';
import { OrderdetailService } from 'src/app/shared/services/orderdetail.service';
import { OrderheadService } from 'src/app/shared/services/orderhead.service';


@Component({
  selector: 'app-grdialog',
  templateUrl: './grdialog.component.html',
  styleUrls: ['./grdialog.component.css']
})
export class GrdialogComponent implements OnInit {
  orderId:any;
  grId:any;
  gRForm!: FormGroup;
  actionBtn: string = "Save"
  ordernolist:any= [];
  supplierlist:any;
  GrObject:GoodsReceipt=new GoodsReceipt();
  GrDetailObject:GoodsReceiptDetail=new GoodsReceiptDetail();
  DetaildisplayedColumns:string[]=['id','orderheadId','productname','qty','rate','amount','taxper','totalamount','Action']
  // dataSource!: MatTableDataSource<any>;
  DetaildataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private formBuilder: FormBuilder,
    private grService:GoodsreceiptService,
    private SuppService:SupplierService,
    private notificationService: NotificationserviceService,
    private OrdHeadService:OrderheadService,
    private orderDetService:OrderdetailService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private grdialogRef :MatDialogRef<GrdialogComponent>,
    private GRDService:GoodsreceiptdetailService

  ) { }

  ngOnInit(): void {
    this.getAllSuppliers()
    this.gRForm = this.formBuilder.group({
      id: [0, Validators.required],
      orderid: [0],
      //grNumber: [, Validators.required],
      grDate: ['', Validators.required],
      supplierId:['',Validators.required],
      supplierName:['',Validators.required],
      orderId: [, Validators.required],
      invoiceNumber: [, Validators.required],
      grRemarks: [''],
    })
    this.gRForm.controls['id'].disable();
    console.log(this.editData);
    if(this.editData){
    this.actionBtn = "Update"
    this.gRForm.controls['id'].setValue(this.editData.id);
    this.grId=this.editData.id;
    //this.gRForm.controls['grNumber'].setValue(this.editData.grNumber);
    this.gRForm.controls['grDate'].setValue(this.editData.grDate);
    this.ordernolist.push({
      "id":this.editData.orderId
    })
    this.gRForm.controls['orderId'].setValue(this.editData.orderId);
    
    //this.gRForm.get('orderId').setValue(toSelect);
debugger;
    this.orderId=this.editData.orderId;
    this.gRForm.controls['supplierId'].setValue(this.editData.supplierId);
    this.gRForm.controls['supplierName'].setValue(this.editData.supplierName);
    //this.getOrderDetailById(this.goodsForm.value.orderId);
    this.gRForm.controls['invoiceNumber'].setValue(this.editData.invoiceNumber);
    this.gRForm.controls['grRemarks'].setValue(this.editData.grRemarks);
    this.getGRDetailBYId(this.grId);
    }

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
  SupplierChange(event:any,supplier:any){
    debugger;
    if (event.isUserInput==true) {
      this.gRForm.controls['supplierName'].setValue(supplier.SupplierName);
      debugger;
      this.DetaildataSource=new MatTableDataSource();
      this.getorderno(supplier.id);
    }
  }
  getorderno(supplierId:number){
    
debugger;
    this.OrdHeadService.getOrderBysupplier(supplierId)
      .subscribe({
      next:(res)=>{
        this.ordernolist=res;
      },
      error:(err)=>{
        alert("error while fetching data");
      }
    })

  }
  ordernochange(event:any,order:any){
        debugger;
        if (event.isUserInput==true) {
        this.orderId=order.id;
        this.getOrderDetailById(order.id);
        }
  }


  getOrderDetailById(Id:number){
    debugger;
    this.orderDetService.getorderdetailbyId(Id)
    .subscribe(orderdet=>{
      debugger;
      this.DetaildataSource=new MatTableDataSource(orderdet)
      this.DetaildataSource.paginator=this.paginator;
      this.DetaildataSource.sort=this.sort;
   })
  }
  getGRDetailBYId(Id:number){
    debugger;
    this.GRDService.getGRDetailbyId(Id)
    .subscribe(orderdet=>{
      debugger;
      this.DetaildataSource=new MatTableDataSource(orderdet)
      this.DetaildataSource.paginator=this.paginator;
      this.DetaildataSource.sort=this.sort;
   })

  }

  addGoodsData() {
   
      debugger;
     
      if (this.gRForm.valid) {

        this.GrObject.id=this.gRForm.value.id;
        this.GrObject.supplierId=this.gRForm.value.supplierId;
        this.GrObject.supplierName=this.gRForm.value.supplierName;
        this.GrObject.grDate=this.gRForm.value.grDate;
        this.GrObject.grNumber=this.gRForm.value.grNumber;
        this.GrObject.grRemarks=this.gRForm.value.grRemarks;
        this.GrObject.invoiceNumber=this.gRForm.value.invoiceNumber;
        this.GrObject.orderId=this.orderId;

        if (!this.editData) {
        console.log('check')
        console.log(this.gRForm.value)
        this.grService.postgoodsReceipt(this.GrObject)
          .subscribe({
            next: (res) => {
              debugger;
              this.gRForm.controls['id'].setValue(res.id);
              this.grId=res.id;
              this.addGoodsDetailData();
              // this.notificationService.success(':: Goods receipt added successfully');
              // this.gRForm.reset();
              // this.grdialogRef.close('save');
            },
            error: () => {
              alert("error while adding Goods receipt")
            }
          })

        }
        else {
          this.updateGoodsReceipt()
        }


      }

   
  }
  addGoodsDetailData(){
    debugger;
    var i=0;
    for (i=0;i<=this.DetaildataSource.filteredData.length-1;i++){
      debugger;
      this.GrDetailObject.orderheadId=this.DetaildataSource.filteredData[i].orderheadId;
      this.GrDetailObject.productsId=this.DetaildataSource.filteredData[i].productsId;
      this.GrDetailObject.productname=this.DetaildataSource.filteredData[i].productname;
      this.GrDetailObject.qty=parseFloat(this.DetaildataSource.filteredData[i].qty);
      this.GrDetailObject.rate=parseFloat(this.DetaildataSource.filteredData[i].rate);
      this.GrDetailObject.taxcode=this.DetaildataSource.filteredData[i].taxcode;
      this.GrDetailObject.taxper= parseFloat(this.DetaildataSource.filteredData[i].taxper);
      this.GrDetailObject.totalamount= parseFloat(this.DetaildataSource.filteredData[i].totalamount);
      this.GrDetailObject.amount=parseFloat(this.DetaildataSource.filteredData[i].amount);
      this.GrDetailObject.grId=this.grId;

         this.GRDService.postGRDetail(this.GrDetailObject)
          .subscribe({
            next: (res) => {
              debugger;
              if (i==this.DetaildataSource.filteredData.length){
                debugger
                this.notificationService.success(':: Goods receipt added successfully');
                this.gRForm.reset();
                this.grdialogRef.close('save');
              }
             
            },
            error: () => {
              alert("error while adding Goods receipt")
            }
          })

    }
  }

  updateGoodsReceipt() {
    console.log('check')
    this.grService.putgoodsReceipt(this.editData.id, this.gRForm.value)
      .subscribe({
        next: (res) => {
          alert("Goods receipt data updated successfully")
          this.gRForm.reset();
          this.grdialogRef.close('update');
        },
        error: () => {
          alert("error while updating Goods receipt")
        }
      })
  }

  onClose() {
    this.gRForm.reset();
    this.grdialogRef.close();
  }

  deleteGRDetail(id:number){
    debugger
    this.GRDService.deleteGRDetail(id)
    .subscribe({
      next:(res)=>{
        debugger;
        this.getGRDetailBYId(this.grId);
        this.notificationService.warn('.! Goods Receipt detail Deleted successfully');
      },
      error:()=>{
        //alert("error while deleting record")
        this.notificationService.warn('error while deleting record');
      }
    })
  }


}
