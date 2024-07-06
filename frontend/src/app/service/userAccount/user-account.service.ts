import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StudentIdentity} from "../../model/student-identity.component";
import {environment} from "../../../environments/environment";
import {UserAccount} from "../../model/user-account.component";

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private http: HttpClient) {
  }
  public findAllUser(): Observable<Array<UserAccount>>{
    return this.http.get<Array<UserAccount>>(environment.backendHost + "/api/user/v1/")
  }
}
