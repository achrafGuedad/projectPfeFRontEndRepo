import {Injectable} from "@angular/core";
import {AuthenticationService} from "./AuthenticationService";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../com.project.frontEnd.model/User";
import {Salle} from "../com.project.frontEnd.model/Salle";
import {Matiere} from "../com.project.frontEnd.model/Matiere";
import {Planing} from "../com.project.frontEnd.model/Planing";


@Injectable()
export class CreatePlaningService {


  constructor(private auth:AuthenticationService,private httpClient:HttpClient){}
  private jwt:any;

  getAllProfessors(){

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<User[]>("http://localhost:8080/Account/getAllTeachers",
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }

  getAllSalle(){

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<Salle[]>("http://localhost:8080/Salle/getAllSalle",
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }
  getPlaning(idClasse:number){

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<Planing[]>("http://localhost:8080/Plan/getListPlaningByClassId/"+idClasse,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }


  //Save PLaning

  public savePlanApi(plan:Planing){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    let headers=new HttpHeaders();
    headers.append('authorization',this.jwt);
    return  this.httpClient.post("http://localhost:8080/Plan/savePlan",plan,{headers: new HttpHeaders({'Authorization': this.jwt})} );

  }



  getPlaningOfStudent(username:string){

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<Planing[]>("http://localhost:8080/Plan/getPlaningByStudent/"+username,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }




}
