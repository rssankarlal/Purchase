import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrderdetailService {

  constructor(private http:HttpClient) { }
  postOrderDetails(data:any){
    console.log('post test',data)
    return this.http.post<any>("http://localhost:3000/orderdetail/",data);
  }
  getorderdetail(){
    return this.http.get<any>("http://localhost:3000/orderdetail/");
  }
  getorderdetailbyId(id:number){
    return this.http.get<any>("http://localhost:3000/orderdetail?orderheadId="+id);
  }
  putOrderDetails(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/orderdetail/"+id,data);
    }

  deleteOrderdetail(id:number)
  {
    console.log('del',id)
   return this.http.delete<any>("http://localhost:3000/orderdetail/"+id);
  }


}
