import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient, HttpResponse} from '@angular/common/http';
import {Filiere} from '../com.project.frontEnd.model/Filiere';
import {AuthenticationService} from "./AuthenticationService";
import {ResponseWrapper} from "../ResponseWrapper";

import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Response,Http,Headers} from  "@angular/http";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class  FiliereService {

  private uri_api_getAll:string="http://localhost:8080/Filiere/getAll";
  private uri_api_create:string="http://localhost:8080/Filiere/create";
  private uri_api_findFiliere_ById:string;
  private uri_api_deleteFiliereById:string;

  jwt:string;

  constructor(private httpClient: HttpClient,private auth:AuthenticationService,private http:Http) {}


  //LOAD JWT
  loadToken(){
    this.jwt=localStorage.getItem('token');
  }

  getAllFiliere(page:number,size:number) {

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<Filiere[]>("http://localhost:8080/Filiere/getAllFiliere/" + page + "/" + size,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }

  //GET ALL FILIERE WITH OUT PAGINNATION
  getAllFiliereWithoutpagination() {

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<Filiere[]>("http://localhost:8080/Filiere/getAll",
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }
  CountFiliere() {

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get("http://localhost:8080/Filiere/getTotalFields/",
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }


    /*getAllFiliere(page:number,size:number): Observable<HttpResponse<ResponseWrapper>>{

      if(this.jwt==null)
      {
        this.jwt=this.auth.loadJWT();
      }

      return  this.httpClient.get<HttpResponse<ResponseWrapper>>("http://localhost:8080/Filiere/getAllFiliere/"+page+"/"+size,
        {headers:new HttpHeaders({'Authorization':this.jwt,observe: 'response,Access-Control-Allow-Headers','Access-Control-Allow-Headers':'Access-Control-Allow-Origin',
          'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS'})});
        //.map((res:Response)=>this.convertResponse(res));


    }*/

  convertResponse (res:Response){
    return new ResponseWrapper (res.headers,res.json(),res.status);

  }


  saveFiliere(filiere:Filiere){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    let headers=new HttpHeaders();
    headers.append('authorization',this.jwt);
    return this.httpClient.post(this.uri_api_create,filiere,{headers:new HttpHeaders({'Authorization':this.jwt})})
  }


  getFiliereById(codeFiliere: number) {

    this.uri_api_findFiliere_ById="http://localhost:8080/Filiere/getById/"+codeFiliere;
    return  this.httpClient.get<Filiere>(this.uri_api_findFiliere_ById,httpOptions);

  }





      deleteFiliereByIdd(idFiliere :number) {
        if (this.jwt == null) {
          this.jwt = this.auth.loadJWT();
        }

        this.uri_api_deleteFiliereById = "http://localhost:8080/Filiere/delete/" + idFiliere;
        return this.httpClient.delete(this.uri_api_deleteFiliereById, {headers: new HttpHeaders({'Authorization': this.jwt})});

      }
}
