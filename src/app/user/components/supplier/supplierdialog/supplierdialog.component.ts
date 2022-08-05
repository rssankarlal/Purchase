import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Supplier } from 'src/app/shared/models/Suppliers';
import { NotificationserviceService } from 'src/app/shared/services/notificationservice.service';
@Component({
  selector: 'app-supplierdialog',
  templateUrl: './supplierdialog.component.html',
  styleUrls: ['./supplierdialog.component.css']
})
export class SupplierdialogComponent implements OnInit {
  supplierObject: Supplier= new Supplier();
  supplierForm!:FormGroup;
  actionBtn:string="Save"
  constructor(
    private formBuilder:FormBuilder ,
    private matSnackBar: MatSnackBar,
    private supplier:SupplierService,
    private notificationService: NotificationserviceService,
    @Inject(MAT_DIALOG_DATA)public editData:any,

    
    private supplierdialogRef :MatDialogRef<SupplierdialogComponent>

  ) { }

  ngOnInit(): void {

    this.supplierForm=this.formBuilder.group({
      // productID:['',Validators.required],
      id:[0],
      SupplierName:['',Validators.required],
      SupplierAddress:['',Validators.required],
      ContactName:['',Validators.required],
      ContactNumber:['',Validators.required],
      ContactEmail:['',Validators.required],
      GSTNumber:['',Validators.required]
     })
     if(this.editData){
      this.actionBtn="Update"
    //  this.productForm.controls['productID'].setValue(this.editData.productID);
    this.supplierForm.controls['id'].setValue(this.editData.id);
      this.supplierForm.controls['SupplierName'].setValue(this.editData.SupplierName);
      this.supplierForm.controls['SupplierAddress'].setValue(this.editData.SupplierAddress);
      this.supplierForm.controls['ContactName'].setValue(this.editData.ContactName);
      this.supplierForm.controls['ContactNumber'].setValue(this.editData.ContactNumber);
      this.supplierForm.controls['ContactEmail'].setValue(this.editData.ContactEmail);
      this.supplierForm.controls['GSTNumber'].setValue(this.editData.GSTNumber);
    }
  }

  addSupplier(){
    if(this.supplierForm.valid){
      this.supplierObject.id=this.supplierForm.value.id;
      this.supplierObject.SupplierName=this.supplierForm.value.SupplierName;
      this.supplierObject.SupplierAddress=this.supplierForm.value.SupplierAddress;
      this.supplierObject.ContactName=this.supplierForm.value.ContactName;
      this.supplierObject.ContactNumber=this.supplierForm.value.ContactNumber;
      this.supplierObject.ContactEmail=this.supplierForm.value.ContactEmail;
      this.supplierObject.GSTNumber=this.supplierForm.value.GSTNumber;

    if(!this.editData)
    {
     
        console.log('check')
        console.log(this.supplierForm.value)
        this.supplier.postSupplier(this.supplierObject)
        .subscribe({
          next:(res)=>{
          
            this.notificationService.success(':: Supplier added successfully');
            //alert("supplier added successfully")
            this.supplierForm.reset();
            this.supplierdialogRef.close('save');
          },
          error:()=>{
            alert("error while adding supplier")
          }
        })
       //}
    }
    else{
      this.updateSupplier()
    }
  }
   
}
updateSupplier(){
  console.log('check')
  this.supplier.putSupplier(this.supplierObject,this.editData.id)
  .subscribe({
    next:(res)=>{
      
      this.notificationService.success(':: Supplier Updated successfully');
      this.supplierForm.reset();
      this.supplierdialogRef.close('update');
    },
    error:()=>{
      alert("error while updating supplier")
    }
  })
}
onClose() {
  this.supplierForm.reset();
  this.supplierdialogRef.close();
}


}
