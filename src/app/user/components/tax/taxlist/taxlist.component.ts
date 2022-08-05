import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationserviceService } from 'src/app/shared/services/notificationservice.service';
import { TaxService } from 'src/app/shared/services/tax.service';
import { TaxdialogComponent } from '../taxdialog/taxdialog.component';

@Component({
  selector: 'app-taxlist',
  templateUrl: './taxlist.component.html',
  styleUrls: ['./taxlist.component.css']
})
export class TaxlistComponent implements OnInit {
  displayedColumns: string[] = ['id', 'taxcode','taxdesc','taxper','cgst','sgst','Action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private TaxService:TaxService
    ,private notificationService: NotificationserviceService
    ,private categoryDialog:MatDialog 

  ) { }

  ngOnInit(): void {
    this.getAllTax();
  }

  openDialog() {
    this.categoryDialog.open(TaxdialogComponent, {disableClose: true,
      width:'60%',height:'50%',
    }).afterClosed().subscribe(val=>{
      if (val ==='save'){
        this.getAllTax();
      }
    });
  }
  getAllTax(){
    this.TaxService.getTax()
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

  editTax(row:any){
    this.categoryDialog.open(TaxdialogComponent,{
      width:'60%',height:'50%',
      data:row
    }).afterClosed().subscribe(val=>{
      if (val ==='update'){
        this.getAllTax();
      }
    });
  }
  deleteTax(id:number){
    this.TaxService.deleteTax(id)
    .subscribe({
      next:(res)=>{
        
        this.notificationService.warn('.! Tax Deleted successfully');
        this.getAllTax();
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
