import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationserviceService } from 'src/app/shared/services/notificationservice.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CategorydialogComponent } from '../categorydialog/categorydialog.component';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {
  displayedColumns: string[] = ['id', 'categorydesc','Action'];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private catService:CategoryService
    ,private notificationService: NotificationserviceService
     ,private categoryDialog:MatDialog 

  ) { }

  ngOnInit(): void {
    this.getAllCategory();
  }
  openDialog() {
    this.categoryDialog.open(CategorydialogComponent, {disableClose: true,
      width:'60%',height:'50%',
    }).afterClosed().subscribe(val=>{
      if (val ==='save'){
        this.getAllCategory();
      }
    });
  }
  getAllCategory(){
    this.catService.getCategory()
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

  editCategory(row:any){
    this.categoryDialog.open(CategorydialogComponent,{
      width:'60%',height:'50%',
      data:row
    }).afterClosed().subscribe(val=>{
      if (val ==='update'){
        this.getAllCategory();
      }
    });
  }
  deleteCategory(id:number){
    this.catService.deleteCategory(id)
    .subscribe({
      next:(res)=>{
        
        this.notificationService.warn('.! Category Deleted successfully');
        this.getAllCategory();
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
