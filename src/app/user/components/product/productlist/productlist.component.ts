import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/Products';
import { NotificationserviceService } from 'src/app/shared/services/notificationservice.service';
import { ProductdialogComponent } from '../productdialog/productdialog.component';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  Product: Product []=[];
  productObject: Product= new Product();
  displayedColumns: string[] = ['id', 'productName', 'productPrice','productDescription','taxcode','Action'];
  dataSource!: MatTableDataSource<any>;
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchKey:any;

  constructor(
    private product:ProductService,private productdialog:MatDialog
    ,private notificationService: NotificationserviceService

  ) { }

  ngOnInit(): void {
    this.getAllProducts()
  }
  openDialog() {
    this.productdialog.open(ProductdialogComponent, {disableClose: true,
      width:'60%',height:'50%',
    }).afterClosed().subscribe(val=>{
      if (val ==='save'){
        this.getAllProducts();
      }
    });
  }
  getAllProducts(){
    this.product.getProduct()
       .subscribe(Product=>{
        this.Product= Product
        this.dataSource=new MatTableDataSource(Product)
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;

    })
  }
  editProduct(row:any){
    this.productdialog.open(ProductdialogComponent,{
      width:'60%',height:'50%',
      data:row
    }).afterClosed().subscribe(val=>{
      if (val ==='update'){
        this.getAllProducts();
      }
    });
  }
  deleteProduct(id:number){
    this.product.deleteProduct(id)
    .subscribe({
      next:(res)=>{
       // alert("product deleted successfully")
        this.notificationService.warn('! Deleted successfully');
    
        this.getAllProducts();
      },
      error:()=>{
        alert("error while deleting record")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 


}
