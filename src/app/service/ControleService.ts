import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Classe} from "../com.project.frontEnd.model/Classe";
import {AuthenticationService} from "./AuthenticationService";
import {Planing} from "../com.project.frontEnd.model/Planing";
import {Etudiant} from "../com.project.frontEnd.model/Etudiant";
import {Absence} from "../com.project.frontEnd.model/Absence";
import {Controle} from "../com.project.frontEnd.model/Controle";

@Injectable()
export class ControleService {

  private jwt: any;

  constructor(private httpClient: HttpClient, private auth: AuthenticationService) {
  }


  getPlaningForProf(username: string) {

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<Classe[]>("http://localhost:8080/Controle/getClassesByCurrentYear/" + username,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }


  getMatiereOfClass(idClasse: number, username: string) {

    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<Planing[]>("http://localhost:8080/Controle/getMatiereOfProf/" + idClasse + "/" + username,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
    //.map((res:Response)=>this.convertResponse(res));
  }

  getStudentsOfClass_Api(idClass: number, page: number, size: number) {
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<Etudiant[]>("http://localhost:8080/Controle/getStudentsOfClass/" + idClass + "/" + page + "/" + size,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
  }


  //Total etudiant
  getTotalStudentsOfClass_Api(idClass: number) {
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    return this.httpClient.get<number>("http://localhost:8080/Absence/getTotalStudentsOfClass/" + idClass,
      {headers: new HttpHeaders({'Authorization': this.jwt})});
  }


  saveNoteControle_Api(controle: Controle) {
    if (this.jwt == null) {
      this.jwt = this.auth.loadJWT();
    }

    let headers = new HttpHeaders();
    headers.append('authorization', this.jwt);
    return this.httpClient.post("http://localhost:8080/Controle/saveNoteControle/", controle, {headers: new HttpHeaders({'Authorization': this.jwt})});
  }

}
