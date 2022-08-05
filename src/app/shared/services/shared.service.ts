import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  orderheadId:any
  constructor() { }

  SetOrderHeadId(data:any){
    this.orderheadId=data;
  }
  GetOrderHeadId(){
    return this.orderheadId;
  }
}
