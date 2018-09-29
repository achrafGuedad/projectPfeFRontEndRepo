import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AnneeScolaire} from "../com.project.frontEnd.model/AnneeScolaire";
import {User} from "../com.project.frontEnd.model/User";
import {Filiere} from "../com.project.frontEnd.model/Filiere";
import {JwtHelper} from "angular2-jwt";
import {Router} from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class AuthenticationService {

  private   jwtToken=null;
  private roles:Array<any>;

  constructor(private httpClient:HttpClient,private router:Router){}


  login(user:User){
    return  this.httpClient.post("http://localhost:8080/login",user,{observe:'response'});
    //.map((resp: Response)=>resp.json());
  }

  public isAuthenticated(): boolean {
    const thetoken = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    let jwtHelper=new JwtHelper();
    return !jwtHelper.isTokenExpired(thetoken);
  }
user:any;


saveToken(token:string) {

    this.jwtToken=token;
    localStorage.setItem('token',token);
    let jwtHelper=new JwtHelper();
    this.roles=jwtHelper.decodeToken(this.jwtToken).roles;
    this.user=jwtHelper.decodeToken(this.jwtToken).sub;
  }

  loadToken(){

    this.jwtToken=localStorage.getItem('token');
  }

  loadUser()
  { return this.user;}

  loadJWT(){
    return localStorage.getItem('token');
  }

  getAllFiliere()  {
     if(this.jwtToken==null)
     {
       this.loadToken();
     }

     return  this.httpClient.get<Filiere[]>("http://localhost:8080/Filiere/getAll",{headers:new HttpHeaders({'Authorization':this.jwtToken})});

  }
saveFiliere(fi:Filiere){

    let headers=new HttpHeaders();
    headers.append('authorization',this.jwtToken);
    return this.httpClient.post("url",fi,{headers:new HttpHeaders({'Authorization':this.jwtToken})})
  }

  logOut(){
    this.jwtToken=null;
    localStorage.removeItem('token');
    localStorage.clear();

  }

   isAdmin(){

    for(let r of this.roles){
      if(r.authority=='ADMIN') return true;
    }
    return false;

   }

  isSecretaire(){

    for(let r of this.roles){
      if(r.authority=='SECRETAIRE') return true;
    }
    return false;

  }

  isProf(){

    for(let r of this.roles){
        if(r.authority=='PROFESSEUR') return true;
    }
    return false;

  }

  isSurveillant(){

    for(let r of this.roles){
      if(r.authority=='SURVEILLANT') return true;
    }
    return false;

  }

  isStudent(){

    for(let r of this.roles){
      if(r.authority=='ETUDIANT') return true;
    }
    return false;

  }




}
