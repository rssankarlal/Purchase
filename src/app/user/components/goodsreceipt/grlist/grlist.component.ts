import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { GoodsreceiptService } from 'src/app/shared/services/goodsreceipt.service';
import { GoodsReceipt } from 'src/app/shared/models/goodreceipt';
import { GrdialogComponent } from '../grdialog/grdialog.component';
import { NotificationserviceService } from 'src/app/shared/services/notificationservice.service';

@Component({
  selector: 'app-grlist',
  templateUrl: './grlist.component.html',
  styleUrls: ['./grlist.component.css']
})
export class GrlistComponent implements OnInit {
  displayedColumns: string[] = ['id', 'grDate', 'orderId','invoiceNumber','grRemarks', 'Action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private grService:GoodsreceiptService
    ,private grdialog:MatDialog
    ,private notificationService: NotificationserviceService

  ) { }

  ngOnInit(): void {
    this.getAllgetGoodsReceipt()
  }
  
  openDialog() {    
    this.grdialog.open(GrdialogComponent, {disableClose: true,
      width:'100%',height:'100%'
    }).afterClosed().subscribe(val=>{
      if (val ==='save'){    
        debugger;   
        this.getAllgetGoodsReceipt();
      }
    });
  }

  getAllgetGoodsReceipt(){
    debugger;
    this.grService.getgoodsReceipt()   
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
  editgoodsReceipt(row:any){
    this.grdialog.open(GrdialogComponent,{
      width:'100%',height:'100%',
      data:row
    }).afterClosed().subscribe(val=>{
      if (val ==='update'){
        this.getAllgetGoodsReceipt();
      }
    });
  }

  deletegoodsReceipt(id:number){
    this.grService.deletegoodsReceipt (id)
    .subscribe({
      next:()=>{
        this.getAllgetGoodsReceipt();
        //alert("Goods receipt entry deleted successfully")
        this.notificationService.warn('.! Goods receipt entry deleted successfully');
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
