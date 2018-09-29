import {Injectable} from "@angular/core";
import {AuthenticationService} from "./AuthenticationService";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Classe} from "../com.project.frontEnd.model/Classe";
import {Etudiant} from "../com.project.frontEnd.model/Etudiant";
import {Inscription} from "../com.project.frontEnd.model/Inscription";

@Injectable()
export class ReinscriptionService {

private jwt:any;
private uriApi_create:string;

  constructor(private httpClient:HttpClient,private auth:AuthenticationService){}


   getAllClasseOnCurrentDate() {

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<Classe[]>("http://localhost:8080/Classe/getDate",
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }

  public saveReinscriptionApi(inscription:Inscription){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }
    this.uriApi_create= "http://localhost:8080/Inscription/ReinscriptionEtudiant";
    let headers=new HttpHeaders();
    headers.append('authorization',this.jwt);
    return  this.httpClient.post(this.uriApi_create,inscription,{headers:new HttpHeaders({'Authorization':this.jwt})
    });

  }

}
