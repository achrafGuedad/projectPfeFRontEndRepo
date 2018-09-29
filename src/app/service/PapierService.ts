import {Injectable} from "@angular/core";
import {Absence} from "../com.project.frontEnd.model/Absence";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./AuthenticationService";
import {Papier} from "../com.project.frontEnd.model/Papier";
import {DemandePapier} from "../com.project.frontEnd.model/DemandePapier";


@Injectable()
export class  PapierService{

  public jwt:any;

  constructor(private httpClient:HttpClient,private auth:AuthenticationService){}

  getListPapier_Api(){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<Papier[]>("http://localhost:8080/Papier/getListPapier/",
      {headers: new HttpHeaders({'Authorization': this.jwt})});
  }

  saveDemandePapier_Api(demandePapier:DemandePapier,username:string){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    let headers=new HttpHeaders();
    headers.append('authorization',this.jwt);
    return this.httpClient.post("http://localhost:8080/Papier/saveDemandePapier/"+username,demandePapier,{headers: new HttpHeaders({'Authorization': this.jwt})});
  }


  getListDemande_Api(page:number,size:number){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<DemandePapier[]>("http://localhost:8080/DemandePapier/getListDemande/"+page+"/"+size,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
  }

  getTotalDemande_Api(){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<Papier[]>("http://localhost:8080/DemandePapier/getTotalFields/",
      {headers: new HttpHeaders({'Authorization': this.jwt})});
  }


  updateState_Api(demande:DemandePapier){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.put("http://localhost:8080/DemandePapier/updatState",demande,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
  }



  //------------------------------------------------


  getDemandsOfStudent(username:string,page:number,size:number){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<DemandePapier[]>("http://localhost:8080/DemandePapier/getDemandsOfStudent/"+username+"/"+page+"/"+size,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
  }

  countDemandsOfStudent_Api(username:string){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<DemandePapier[]>("http://localhost:8080/DemandePapier/countDemandsOfStudent/"+username,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
  }

}
