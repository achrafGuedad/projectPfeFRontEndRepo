import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Etudiant} from "../com.project.frontEnd.model/Etudiant";
import {AuthenticationService} from "./AuthenticationService";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export  class EtudiantService {
  constructor(private httpClient:HttpClient,private  auth:AuthenticationService){}

  // APIS URI
  private uriApi_create: string;

  //--------
  private jwt:any;






  public saveEtudiantApi(etudiant:Etudiant,role:string){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }
    this.uriApi_create= "http://localhost:8080/Accout/create/"+role;
    let headers=new HttpHeaders();
    headers.append('authorization',this.jwt);
    return  this.httpClient.post(this.uriApi_create,etudiant,{headers:new HttpHeaders({'Authorization':this.jwt})
    });

  }















}
