import { Injectable } from '@angular/core';
import {StudentFamily} from "../../model/student-family.component";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PageResponse} from "../../model/page.response.model";
import {HttpClient} from "@angular/common/http";
import {Payment} from "../../model/payment.component";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  public savePayment(payment: Payment):Observable<Payment>{
    return this.http.post<Payment>(environment.backendHost +
        "/api/payment", payment);
  }
  public searchPayment(keyword:string,currentPage:number,pageSize:number){
    return this.http.get<PageResponse<Payment>>(environment.backendHost +
        "/api/payment/findByDeletedFalse?keyword=" + keyword + "&page=" + currentPage + "&size=" + pageSize);
  }
  public updatePayment(payment: Payment,secureId: string):Observable<Payment>{
    return this.http.put<Payment>(environment.backendHost +
        "/api/payment/"+ secureId, payment);
  }

  deletePayment(secureId: string) {
    return this.http.delete(environment.backendHost + "/api/payment/v1/softDelete/" + secureId);
  }
}
