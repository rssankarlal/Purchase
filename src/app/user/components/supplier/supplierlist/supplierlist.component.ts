import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { NotificationserviceService } from 'src/app/shared/services/notificationservice.service';
import { SupplierdialogComponent } from '../supplierdialog/supplierdialog.component';
@Component({
  selector: 'app-supplierlist',
  templateUrl: './supplierlist.component.html',
  styleUrls: ['./supplierlist.component.css']
})
export class SupplierlistComponent implements OnInit {
  title = 'inventoryproject';

  displayedColumns: string[] = ['id', 'SupplierName', 'SupplierAddress','ContactName', 'ContactNumber','ContactEmail','GSTNumber','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private supplier:SupplierService,private supplierdialog:MatDialog
    ,private notificationService: NotificationserviceService

  ) { }

  ngOnInit(): void {
    this.getAllSuppliers()
  }

  openDialog() {
    this.supplierdialog.open(SupplierdialogComponent, {disableClose: true,
      width:'60%',height:'50%',
    }).afterClosed().subscribe(val=>{
      if (val ==='save'){
        this.getAllSuppliers();
      }
    });
  }
  getAllSuppliers(){
    this.supplier.getSupplier()
   
    .subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res)
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(err)=>{
        alert("error while fetching data");
      }
    })
  }
  editSupplier(row:any){
    this.supplierdialog.open(SupplierdialogComponent,{
      width:'60%',height:'50%',
      data:row
    }).afterClosed().subscribe(val=>{
      if (val ==='update'){
        this.getAllSuppliers();
      }
    });
  }
  deleteSupplier(id:number){
    this.supplier.deleteSupplier(id)
    .subscribe({
      next:(res)=>{
        
        this.notificationService.warn('.! Supplier Deleted successfully');
        this.getAllSuppliers();
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
