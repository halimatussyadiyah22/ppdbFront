import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StudentFamily} from "../../model/student-family.component";
import {environment} from "../../../environments/environment";
import {PageResponse} from "../../model/page.response.model";
import {toJSDate} from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar";

@Injectable({
  providedIn: 'root'
})
//
// di service ini pastikan api nya sesuai dengan backend
//
export class StudentFamilyService {

  constructor(private http: HttpClient) { }
  //create
  public saveStudentFamily(studentFamily: StudentFamily):Observable<StudentFamily>{
    return this.http.post<StudentFamily>(environment.backendHost +
        "/api/studentFamily", studentFamily);
  }
  //get atau search
  public searchStudentFamily(keyword:string,currentPage:number,pageSize:number){
    return this.http.get<PageResponse<StudentFamily>>(environment.backendHost +
        "/api/studentFamily?keyword=" + keyword + "&page=" + currentPage + "&size=" + pageSize);
  }
  //update
  public updateStudentFamily(studentFamily: StudentFamily,secure_id: string):Observable<StudentFamily>{
    return this.http.put<StudentFamily>(environment.backendHost +
        "/api/studentFamily/"+ secure_id, studentFamily);
  }
  //delete
  deletStudentFamily(secure_id: string) {
    return this.http.delete(environment.backendHost + "/api/studentFamily/" + secure_id);

  }
  //softDelete
  softDeleteStudentFamily(secure_id: string) {
    return this.http.delete(environment.backendHost + "/api/studentFamily/v1/softDelete/" + secure_id);

  }
  //undo
  undoSoftDeleteStudentFamily(secure_id: string) {
    return this.http.delete(environment.backendHost + "/api/studentFamily/v1/undoDelete/" + secure_id);
  }

}
