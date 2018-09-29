import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Absence} from "../com.project.frontEnd.model/Absence";
import {AuthenticationService} from "./AuthenticationService";
import {Planing} from "../com.project.frontEnd.model/Planing";
import {Classe} from "../com.project.frontEnd.model/Classe";
import {Etudiant} from "../com.project.frontEnd.model/Etudiant";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class AbsenceService{
  private user:string;
  private jwt:any;
  private uriApi_AbsenceCreate:string="http://localhost:8080/Absence/create";




  constructor(private httpClient:HttpClient,private auth:AuthenticationService){}




  ApiCreateAbsence(absence:Absence){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    let headers=new HttpHeaders();
    headers.append('authorization',this.jwt);
    return this.httpClient.post(this.uriApi_AbsenceCreate,absence,{headers: new HttpHeaders({'Authorization': this.jwt})});
  }

  getPlaningForProf(username:string){

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<Classe[]>("http://localhost:8080/Absence/getClassesByCurrentYear/"+username,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }

  getMatiereAndStudents(idClasse:number,username:string){

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<Planing[]>("http://localhost:8080/Absence/getMatiereOfProf/"+idClasse+"/"+username,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }


  getStudentsOfClass_Api(idClass:number,page:number,size:number){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<Etudiant[]>("http://localhost:8080/Absence/getStudentsOfClass/"+idClass+"/"+page+"/"+size,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
  }
  //getTotalStudentsOfClass

  getTotalStudentsOfClass_Api(idClass:number){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<number>("http://localhost:8080/Absence/getTotalStudentsOfClass/"+idClass,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
  }


   //------------------
  //get student's absences

  getStudentAbsence_Api(username:string,page:number,size:number){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<Absence[]>("http://localhost:8080/Absence/getStudentAbsence/"+username+"/"+page+"/"+size,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
  }

  getTotalStudentAbsence_Api(username:string){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<number>("http://localhost:8080/Absence/CountStudentAbsence/"+username,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
  }



}
