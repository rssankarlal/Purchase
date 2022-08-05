import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GoodsreceiptdetailService {

  constructor(private http: HttpClient) { }

  
  
  getGRDetail() {

    return this.http.get<any>("http://localhost:3000/grdetail/");

  }
  getGRDetailbyId(id: number) {
    debugger;
    return this.http.get<any>("http://localhost:3000/grdetail/?grId=" + id);
  }
  postGRDetail(data: any) {

    return this.http.post<any>("http://localhost:3000/grdetail/", data);

  }
  putGRDetail(id: number, data: any) {

    return this.http.put<any>("http://localhost:3000/grdetail/" + id, data);

  }

  deleteGRDetail(id: number) {

    return this.http.delete<any>("http://localhost:3000/grdetail/" + id);

  }


}
