import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  postProduct(data:any){
    console.log('post test',data)
    return this.http.post<any>("http://localhost:3000/products/",data);
  }
  getProduct(){
    return this.http.get<any>("http://localhost:3000/products/");
  }
  getProductbyId(Id:number){
    return this.http.get<any>("http://localhost:3000/products?id="+Id);
  }
  putProduct(data:any,id:number){
  return this.http.put<any>("http://localhost:3000/products/"+id,data);
  }
  deleteProduct(id:number)
  {
    console.log('del',id)
   return this.http.delete<any>("http://localhost:3000/products/"+id);
  }
  
}
