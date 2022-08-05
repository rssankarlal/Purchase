import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GoodsreceiptService {

  constructor(private http: HttpClient) { }
  
  getgoodsReceipt() {

    return this.http.get<any>("http://localhost:3000/goodsreceipt/");

  }
  getgoodsReceiptById(id: number) {
    debugger;
    return this.http.get<any>("http://localhost:3000/goodsreceipt/?orderId=" + id);
  }
  postgoodsReceipt(data: any) {

    return this.http.post<any>("http://localhost:3000/goodsreceipt/", data);

  }

  putgoodsReceipt(id: number, data: any) {

    return this.http.put<any>("http://localhost:3000/goodsreceipt/" + id, data);

  }

  deletegoodsReceipt(id: number) {

    return this.http.delete<any>("http://localhost:3000/goodsreceipt/" + id);

  }

}
