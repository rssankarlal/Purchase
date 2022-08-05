import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OrderdetailService } from 'src/app/shared/services/orderdetail.service';
import { TaxService } from 'src/app/shared/services/tax.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { NotificationserviceService } from 'src/app/shared/services/notificationservice.service';
import { Taxmodel } from 'src/app/shared/models/Tax';
import { Product } from 'src/app/shared/models/Products';
import { orderdetail } from 'src/app/shared/models/orderdetail';
import { SharedService } from 'src/app/shared/services/shared.service';
@Component({
  selector: 'app-orderdetaildialog',
  templateUrl: './orderdetaildialog.component.html',
  styleUrls: ['./orderdetaildialog.component.css']
})
export class OrderdetaildialogComponent implements OnInit {
  orderHeaderId:any;
  
  orderdetObject:orderdetail=new  orderdetail();
  GstTax:Taxmodel []=[];
  Products:Product []=[];
  freshnessList=["new","used"]

  OrderdetailForm!:FormGroup;
  actionBtn:string="Save"
  constructor(
    private FormBuilder:FormBuilder,
    private product:ProductService,
    private TaxService:TaxService,
    private notificationService: NotificationserviceService,
    @Inject(MAT_DIALOG_DATA)public editData:any,
    private OrderDetdialogRef :MatDialogRef<OrderdetaildialogComponent>
    ,private Shared:SharedService
    ,private OrderDetSer:OrderdetailService


  ) { }

  ngOnInit(): void {

    this.orderHeaderId=this.Shared.orderheadId

    this.OrderdetailForm=this.FormBuilder.group({
      
      // productID:['',Validators.required],
       id:[0],
       orderheadId:this.Shared.orderheadId,
       
       productname:['',Validators.required],
       productsId:['',Validators.required],
       qty:['',Validators.required],
       rate:['',Validators.required],
       amount:['',Validators.required],
       taxcode:['',Validators.required],
       totalamount:['',Validators.required],
       taxper:[0]
       //productComment:['',Validators.required]
     })
      this.OrderdetailForm.controls['orderheadId'].disable();
     if(this.editData){
       this.actionBtn="Update"
       debugger;
     //  this.productForm.controls['productID'].setValue(this.editData.productID);
     this.OrderdetailForm.controls['id'].setValue(this.editData.id);
     this.OrderdetailForm.controls['orderheadId'].setValue(this.Shared.GetOrderHeadId());
       this.OrderdetailForm.controls['productname'].setValue(this.editData.productname);
       this.OrderdetailForm.controls['productsId'].setValue(this.editData.productsId);
       this.OrderdetailForm.controls['qty'].setValue(this.editData.qty);
      this.OrderdetailForm.controls['rate'].setValue(this.editData.rate);
      this.OrderdetailForm.controls['amount'].setValue(this.editData.amount);
       this.OrderdetailForm.controls['taxcode'].setValue(this.editData.taxcode);
       this.OrderdetailForm.controls['totalamount'].setValue(this.editData.totalamount);
       this.OrderdetailForm.controls['taxper'].setValue(this.editData.taxper);
     }

    this.getTax();
    this.getProduct();

  }
  addOrderDetail(){
    if(this.OrderdetailForm.valid){
debugger;
      this.orderdetObject.id=this.OrderdetailForm.value.id;
      this.orderdetObject.orderheadId=this.orderHeaderId;
      this.orderdetObject.productname=this.OrderdetailForm.value.productname;
      this.orderdetObject.productsId=this.OrderdetailForm.value.productsId;
      this.orderdetObject.qty=this.OrderdetailForm.value.qty;
      this.orderdetObject.rate=this.OrderdetailForm.value.rate;
      this.orderdetObject.taxcode=this.OrderdetailForm.value.taxcode;
      this.orderdetObject.amount=this.OrderdetailForm.value.amount;
      this.orderdetObject.totalamount=this.OrderdetailForm.value.totalamount;
      this.orderdetObject.taxper=this.OrderdetailForm.value.taxper;
  
      if(!this.editData)
      {
              this.OrderDetSer.postOrderDetails(this.orderdetObject)
              .subscribe({
                next:(res)=>{
                  //alert("product added successfully")
                  this.notificationService.success(':: Order Detail Added Successfully');
                  this.OrderdetailForm.reset();
                  this.OrderDetdialogRef.close('save');
                },
                error:()=>{
                  alert("error while adding Order Detail")
                }
              })
      }
      else{
        this.updateProduct()
      }
  }
  }

  updateProduct(){

    console.log('check')
    this.OrderDetSer.putOrderDetails(this.orderdetObject,this.editData.id)
    .subscribe({
      next:(res)=>{
        //alert("product updated successfully")
        this.notificationService.success(':: Order Detail updated Successfully');
        this.OrderdetailForm.reset();
        this.OrderDetdialogRef.close('update');
      },
      error:()=>{
        alert("error while updating product")
      }
    })
  }


  getTax(){
    this.TaxService.getTax()
    .subscribe(tax=>{
     this.GstTax= tax
  })
  }

  getProduct(){
    this.product.getProduct()
    .subscribe(product=>{
     this.Products= product
  })
  }
  TaxChanged(event:any,tax:any) {
    debugger;
    if (event.isUserInput==true) {
      this.OrderdetailForm.controls['taxper'].setValue(tax.taxper);
      this.calc();
    }
      
  }
  productChange(event:any,product:any){
    debugger;
    if (event.isUserInput==true) {
      this.OrderdetailForm.controls['productname'].setValue(product.productName);
    }
  }
  calc(){
    debugger;
    var taxper=parseFloat(this.OrderdetailForm.value.taxper);
    var qty=parseFloat(this.OrderdetailForm.value.qty);
    var rate=parseFloat(this.OrderdetailForm.value.rate);
    var tamount=parseFloat(this.OrderdetailForm.value.amount);
    tamount= (qty * rate);
    var taxamount=((tamount)*taxper)/100;
    var totalamount=tamount+taxamount;
    this.OrderdetailForm.controls['amount'].setValue(tamount);
    this.OrderdetailForm.controls['totalamount'].setValue(totalamount);

  }
  onClose() {
    debugger;
    this.OrderdetailForm.reset();
    this.OrderDetdialogRef.close();
  }


}
