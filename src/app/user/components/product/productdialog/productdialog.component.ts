import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotificationserviceService } from 'src/app/shared/services/notificationservice.service';
import { Product } from 'src/app/shared/models/Products';
import { Category } from 'src/app/shared/models/Category';
import { Taxmodel } from 'src/app/shared/models/Tax';
import { CategoryService } from 'src/app/shared/services/category.service';
import { TaxService } from 'src/app/shared/services/tax.service';


@Component({
  selector: 'app-productdialog',
  templateUrl: './productdialog.component.html',
  styleUrls: ['./productdialog.component.css']
})
export class ProductdialogComponent implements OnInit {
  selectedLanguage:any;
  productObject: Product= new Product();
  Category:Category []=[];
  GstTax:Taxmodel []=[];
freshnessList=["new","used"]
//productForm:any;
productForm!:FormGroup;
actionBtn:string="Save"
  constructor(
    private formBuilder:FormBuilder,
    private product:ProductService,
    private catService:CategoryService,
    private TaxService:TaxService,
    private notificationService: NotificationserviceService,
    @Inject(MAT_DIALOG_DATA)public editData:any,
    private productdialogRef :MatDialogRef<ProductdialogComponent>

  ) { }

  ngOnInit(): void {
    this.getCatagory();
this.getTax();
    this.productForm=this.formBuilder.group({
     // productID:['',Validators.required],
      id:[0],
      productName:['',Validators.required],
      //productCategory:['',Validators.required],
      productPrice:['',Validators.required],
      categoryId:['',Validators.required],
      productDescription:['',Validators.required],
      //productAmount:['',Validators.required],
      productTaxpercentage:['',Validators.required],
      taxcode:['',Validators.required],
      //productComment:['',Validators.required]
    })
    if(this.editData){
      this.actionBtn="Update"
      debugger;
    //  this.productForm.controls['productID'].setValue(this.editData.productID);
    this.productForm.controls['id'].setValue(this.editData.id);
      this.productForm.controls['productName'].setValue(this.editData.productName);
      //this.productForm.controls['productCategory'].setValue(this.editData.productCategory);
      this.productForm.controls['categoryId'].setValue(this.editData.categoryId);
     this.productForm.controls['productPrice'].setValue(this.editData.productPrice);
     this.productForm.controls['productDescription'].setValue(this.editData.productDescription);
     //this.productForm.controls['productAmount'].setValue(this.editData.productAmount);
     this.productForm.controls['productTaxpercentage'].setValue(this.editData.productTaxpercentage);
      this.productForm.controls['taxcode'].setValue(this.editData.taxcode);
     // this.productForm.controls['productComment'].setValue(this.editData.productComment);
    }

  }

  getCatagory(){

    this.catService.getCategory()
    .subscribe(category=>{
     this.Category= category
     
  })
  
  }
  getTax(){
    this.TaxService.getTax()
    .subscribe(tax=>{
     this.GstTax= tax
  })
  }
  TaxChanged(event:any,tax:any) {
    debugger;
    if (event.isUserInput==true) {
      this.productForm.controls['productTaxpercentage'].setValue(tax.taxper);
    }
      
  }
   
  addProduct(){
    debugger;
    if(this.productForm.valid){
  
      this.productObject.id=this.productForm.value.id;
      this.productObject.productName=this.productForm.value.productName;
      this.productObject.categoryId=this.productForm.value.categoryId;
      this.productObject.productPrice=this.productForm.value.productPrice;
      this.productObject.productDescription=this.productForm.value.productDescription;
      this.productObject.taxcode=this.productForm.value.taxcode;
      this.productObject.productTaxpercentage=this.productForm.value.productTaxpercentage;
  
      if(!this.editData)
      {
              this.product.postProduct(this.productObject)
              .subscribe({
                next:(res)=>{
                  //alert("product added successfully")
                  this.notificationService.success(':: Product Added Successfully');
                  this.productForm.reset();
                  this.productdialogRef.close('save');
                },
                error:()=>{
                  alert("error while adding product")
                }
              })
      }
      else{
        this.updateProduct()
      }
  }
  
  }
  
  onClose() {
    this.productForm.reset();
    this.productdialogRef.close();
  }
  updateProduct(){
  
  
  
  
    console.log('check')
    this.product.putProduct(this.productObject,this.editData.id)
    .subscribe({
      next:(res)=>{
        //alert("product updated successfully")
        this.notificationService.success(':: Product updated Successfully');
        this.productForm.reset();
        this.productdialogRef.close('update');
      },
      error:()=>{
        alert("error while updating product")
      }
    })
  }

}
