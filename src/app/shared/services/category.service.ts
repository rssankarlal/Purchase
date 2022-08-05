import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }



  postCategory(data:any){
    console.log('post test',data)
    return this.http.post<any>("http://localhost:3000/category/",data);
  }
  getCategory(){
    return this.http.get<any>("http://localhost:3000/category/");
  }
  putCategory(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/category/"+id,data);
    }
    deleteCategory(id:number)
    {
      console.log('del',id)
     return this.http.delete<any>("http://localhost:3000/category/"+id);
    }



}
