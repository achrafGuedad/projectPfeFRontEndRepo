import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Inscription} from "../com.project.frontEnd.model/Inscription";
import {Classe} from "../com.project.frontEnd.model/Classe";
import {Etudiant} from "../com.project.frontEnd.model/Etudiant";
import {AuthenticationService} from "./AuthenticationService";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class InscriptionService {

  private uriApi_create;

  constructor(private httpClient:HttpClient,private  auth:AuthenticationService) {}

  //--------
  private jwt:any;






  public saveEtudiantApi(etudiant:Etudiant,role:string,idClasse:number){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }
    this.uriApi_create= "http://localhost:8080/Account/createEtudiant/"+role+"/"+idClasse;
    let headers=new HttpHeaders();
    headers.append('authorization',this.jwt);
    return  this.httpClient.post(this.uriApi_create,etudiant,{headers:new HttpHeaders({'Authorization':this.jwt})
    });

  }






}
