import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationserviceService } from 'src/app/shared/services/notificationservice.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/models/Category';
@Component({
  selector: 'app-categorydialog',
  templateUrl: './categorydialog.component.html',
  styleUrls: ['./categorydialog.component.css']
})
export class CategorydialogComponent implements OnInit {
  categoryOBject:Category =new Category();
  categoryForm!:FormGroup;
  actionBtn:string="Save"

  constructor(
    private formBuilder:FormBuilder,
    private matSnackBar: MatSnackBar,
    private catService:CategoryService,
    private notificationService: NotificationserviceService,
    @Inject(MAT_DIALOG_DATA)public editData:any,
    private categorydialogRef :MatDialogRef<CategorydialogComponent>

  ) { }

  ngOnInit(): void {

    this.categoryForm=this.formBuilder.group({
      id:[0],
      categorydesc:['',Validators.required],
     
     })
     if(this.editData){
      this.actionBtn="Update"
    this.categoryForm.controls['id'].setValue(this.editData.id);
      this.categoryForm.controls['categorydesc'].setValue(this.editData.categorydesc);
    }

  }

  addCategory(){
    if(this.categoryForm.valid){
      this.categoryOBject.id=this.categoryForm.value.id;
      this.categoryOBject.categorydesc=this.categoryForm.value.categorydesc;

    if(!this.editData)
    {
     
        console.log('check')
        console.log(this.categoryForm.value)
        this.catService.postCategory(this.categoryOBject)
        .subscribe({
          next:(res)=>{
          
            this.notificationService.success(':: Category added successfully');
            //alert("supplier added successfully")
            this.categoryForm.reset();
            this.categorydialogRef.close('save');
          },
          error:()=>{
            alert("error while adding Category")
          }
        })
       //}
    }
    else{
      this.updateCategory()
    }
  }
   
}

updateCategory(){
  console.log('check')
  this.catService.putCategory(this.categoryOBject,this.editData.id)
  .subscribe({
    next:(res)=>{
      
      this.notificationService.success(':: Category Updated successfully');
      this.categoryForm.reset();
      this.categorydialogRef.close('update');
    },
    error:()=>{
      alert("error while updating supplier")
    }
  })
}
onClose() {
  this.categoryForm.reset();
  this.categorydialogRef.close();
}



}
