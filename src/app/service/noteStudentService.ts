import {Injectable} from "@angular/core";
import {AuthenticationService} from "./AuthenticationService";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Classe} from "../com.project.frontEnd.model/Classe";
import {Controle} from "../com.project.frontEnd.model/Controle";

@Injectable()
export class noteStudentService{

  public jwt:any;



  constructor(private auth:AuthenticationService,private httpClient:HttpClient){}

  getNotesOfStudent_Api(username:string,page:number,size:number){

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<Controle[]>("http://localhost:8080/Controle/getNotesOfStudent/"+username+"/"+page+"/"+size,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }

  getTotalFields(username:string){

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get("http://localhost:8080/Controle/getTotalFields/"+username,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }
}
