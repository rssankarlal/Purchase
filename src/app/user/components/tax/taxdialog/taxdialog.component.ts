import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Taxmodel } from 'src/app/shared/models/Tax';
import { TaxService } from 'src/app/shared/services/tax.service';
import { NotificationserviceService } from 'src/app/shared/services/notificationservice.service';

@Component({
  selector: 'app-taxdialog',
  templateUrl: './taxdialog.component.html',
  styleUrls: ['./taxdialog.component.css']
})
export class TaxdialogComponent implements OnInit {
  taxOBject:Taxmodel =new Taxmodel();
  taxForm!:FormGroup;
  actionBtn:string="Save"

  constructor(
    private formBuilder:FormBuilder,
    private matSnackBar: MatSnackBar,
    private TaxService:TaxService,
    private notificationService: NotificationserviceService,
    @Inject(MAT_DIALOG_DATA)public editData:any,
    private taxdialogRef :MatDialogRef<TaxdialogComponent>

  ) { }

  ngOnInit(): void {

    this.taxForm=this.formBuilder.group({
      // productID:['',Validators.required],
      id:[0],
      taxcode:['',Validators.required],
      taxdesc:['',Validators.required],
      taxper:['',Validators.required],
      cgst:['',Validators.required],
      sgst:['',Validators.required],
     
     })
     if(this.editData){
      this.actionBtn="Update"
    //  this.productForm.controls['productID'].setValue(this.editData.productID);
    this.taxForm.controls['id'].setValue(this.editData.id);
    this.taxForm.controls['taxcode'].setValue(this.editData.taxcode);
    this.taxForm.controls['taxper'].setValue(this.editData.taxper);
    this.taxForm.controls['cgst'].setValue(this.editData.cgst);
    this.taxForm.controls['sgst'].setValue(this.editData.sgst);
      this.taxForm.controls['taxdesc'].setValue(this.editData.taxdesc);
    }

  
  }
  addtax(){
    debugger;
    if(this.taxForm.valid){
      this.taxOBject.id=this.taxForm.value.id;
      this.taxOBject.taxcode=this.taxForm.value.taxcode;
      this.taxOBject.taxdesc=this.taxForm.value.taxdesc;
      this.taxOBject.taxper=this.taxForm.value.taxper;
      this.taxOBject.cgst=this.taxForm.value.cgst;
      this.taxOBject.sgst=this.taxForm.value.sgst;

    if(!this.editData)
    {
     
        console.log('check')
        console.log(this.taxForm.value)
        this.TaxService.postTax(this.taxOBject)
        .subscribe({
          next:(res)=>{
          
            this.notificationService.success(':: Tax added successfully');
            //alert("supplier added successfully")
            this.taxForm.reset();
            this.taxdialogRef.close('save');
          },
          error:()=>{
            alert("error while adding Tax")
          }
        })
       //}
    }
    else{
      this.updateTax()
    }
  }
   
}

updateTax(){
  console.log('check')
  this.TaxService.putTax(this.taxOBject,this.editData.id)
  .subscribe({
    next:(res)=>{
      
      this.notificationService.success(':: Tax Updated successfully');
      this.taxForm.reset();
      this.taxdialogRef.close('update');
    },
    error:()=>{
      alert("error while updating supplier")
    }
  })
}

onClose() {
  this.taxForm.reset();
  this.taxdialogRef.close();
}


}
