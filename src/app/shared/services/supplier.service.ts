import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http:HttpClient) { }

  postSupplier(data:any){
    console.log('post test',data)
    return this.http.post<any>("http://localhost:3000/suppliers/",data);
  }
  getSupplier(){
    return this.http.get<any>("http://localhost:3000/suppliers/");
  }
  putSupplier(data:any,id:number){
  return this.http.put<any>("http://localhost:3000/suppliers/"+id,data);
  }
  deleteSupplier(id:number)
  {
    console.log('del',id)
   return this.http.delete<any>("http://localhost:3000/suppliers/"+id);
  }
  
}
