import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Niveau} from '../com.project.frontEnd.model/Niveau';
import {AuthenticationService} from "./AuthenticationService";
import {Filiere} from "../com.project.frontEnd.model/Filiere";
import {ResponseWrapper} from "../ResponseWrapper";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export  class NiveauService{

  private  jwt:any;

  constructor(private httpClient: HttpClient,private auth:AuthenticationService){}

  private uri_api_getAll:string="http://localhost:8080/Niveau/getAll";
  private uri_api_create:string="http://localhost:8080/Niveau/create";
  private uri_api_deleteById:string;
  private uri_api_updateNiveau:string;



  getAll(page:number,size:number) {

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<any>(this.uri_api_getAll+"/"+ page + "/" + size,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }

  getAllOnList() {

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<Niveau[]>("http://localhost:8080/Niveau/getAllNiveauOnList",
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }

  saveNiveau(niveau: Niveau){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    let headers=new HttpHeaders();
    headers.append('authorization',this.jwt);
    return this.httpClient.post(this.uri_api_create,niveau,{headers:new HttpHeaders({'Authorization':this.jwt})})
  }




  updateNiveauApi(idNiveau:number,niveau: Niveau){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    let headers=new HttpHeaders();
    headers.append('authorization',this.jwt);
    this.uri_api_updateNiveau="http://localhost:8080/Niveau/update/"+idNiveau;
    return  this.httpClient.put(this.uri_api_updateNiveau,niveau,{headers:new HttpHeaders({'Authorization':this.jwt})});
    //.map((resp: Response)=>resp.json());
  }




  deleteiveauById(idNiveau :number) {
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }
    this.uri_api_deleteById="http://localhost:8080/Niveau/deleteById/"+idNiveau;
    return this.httpClient.delete(this.uri_api_deleteById, {headers: new HttpHeaders({'Authorization': this.jwt})});



  }

  CountLevels() {

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get("http://localhost:8080/Niveau/getTotalFields/",
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }

}
