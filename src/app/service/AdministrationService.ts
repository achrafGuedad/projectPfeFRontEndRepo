import {Injectable} from "@angular/core";
import {Filiere} from "../com.project.frontEnd.model/Filiere";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./AuthenticationService";
import {Http} from "@angular/http";
import {User} from "../com.project.frontEnd.model/User";

@Injectable()
export class AdministrationService {

  // API URIS
  private uriApi_delete:string;
  private uriApi_create:string;

  private  jwt:any;




  constructor(private httpClient: HttpClient,private auth:AuthenticationService) {}

  getAllUsers() {

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<User[]>("http://localhost:8080/Account/getAllUsers",
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }

  CountFields() {

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get("http://localhost:8080/Account/getTotalFields",
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }


  // DELETE USER
  deleteUserById(idUser:number) {
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    this.uriApi_delete = "http://localhost:8080/Account/deleteUserById/"+idUser;
    return this.httpClient.delete(this.uriApi_delete, {headers: new HttpHeaders({'Authorization': this.jwt})});

  }

  //CREATE  USER

  saveUser(user:User,role:string){
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }
     this.uriApi_create="http://localhost:8080/Account/create/"+role;
    let headers=new HttpHeaders();
    headers.append('authorization',this.jwt);
    return this.httpClient.post(this.uriApi_create,user,{headers:new HttpHeaders({'Authorization':this.jwt})})
  }

}
