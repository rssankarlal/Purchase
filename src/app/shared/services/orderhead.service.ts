import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrderheadService {

  constructor(private http:HttpClient) { }

  
  postOrderHead(data:any){
    console.log('post test',data)
    return this.http.post<any>("http://localhost:3000/orderhead/",data);
  }
  getorderHead(){
    return this.http.get<any>("http://localhost:3000/orderhead/");
  }
  getOrderBysupplier(supplierid:number){
    return this.http.get<any>("http://localhost:3000/orderhead?supplierId="+supplierid);
  }
  putOrderHead(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/orderhead/"+id,data);
    }


  deleteOrderHead(id:number)
  {
    console.log('del',id)
   return this.http.delete<any>("http://localhost:3000/orderhead/"+id);
  }

  
}
