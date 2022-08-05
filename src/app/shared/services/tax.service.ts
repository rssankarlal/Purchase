import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(private http:HttpClient) { }

  postTax(data:any){
    console.log('post test',data)
    return this.http.post<any>("http://localhost:3000/taxdetail/",data);
  }
  getTax(){
    return this.http.get<any>("http://localhost:3000/taxdetail/");
  }
  putTax(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/taxdetail/"+id,data);
    }
    deleteTax(id:number)
    {
      console.log('del',id)
     return this.http.delete<any>("http://localhost:3000/taxdetail/"+id);
    }

}
