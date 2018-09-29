import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Matiere} from "../com.project.frontEnd.model/Matiere";
import {AuthenticationService} from "./AuthenticationService";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export  class MatiereService{


  // VARIABLES
  jwt:any;


  // APIS URI
  private uri_api_getAll:string="http://localhost:8080/Niveau/getAll";
  private uri_api_getAll_by_group:string;
  private uriApi_getListMatiereByLevel:string;
  private uri_api_matiere_create:string="http://localhost:8080/Matiere/create";

  constructor(private httpClient: HttpClient,private auth:AuthenticationService){}




  // SAVE A NEW MATIERE

  public saveMatiereApi(matiere:Matiere){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    let headers=new HttpHeaders();
    headers.append('authorization',this.jwt);
    return  this.httpClient.post(this.uri_api_matiere_create,matiere,{headers: new HttpHeaders({'Authorization': this.jwt})} );

  }
  // GET MATIERE BY LIBELLE NIVEAU

    public getMatiereByGroupApi(niveau:number,page :number,size:number){

      if (this.jwt == null) {
        this.jwt = this.auth.loadJWT();
      }
    this.uri_api_getAll_by_group="http://localhost:8080/Matiere/getMatiereByLibelle/"+niveau+"/"+page+"/"+size;
    return this.httpClient.get<Matiere[]>( this.uri_api_getAll_by_group,{headers: new HttpHeaders({'Authorization': this.jwt})});

  }

  CountMatiere(idNiveau:number) {

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get("http://localhost:8080/Matiere/getTotalFields/"+idNiveau,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }




  deleteMatiere(idMatiere :number) {
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }
    let uri_api="http://localhost:8080/Matiere/deleteById/"+idMatiere;
    return this.httpClient.delete(uri_api, {headers: new HttpHeaders({'Authorization': this.jwt})});



  }
  public getMatiereByIdClasseApi(idClasse:number){

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }
    this.uriApi_getListMatiereByLevel="http://localhost:8080/Matiere/getListMatiereByLevel/"+idClasse;
    return this.httpClient.get<Matiere[]>( this.uriApi_getListMatiereByLevel,{headers: new HttpHeaders({'Authorization': this.jwt})});

  }

}
