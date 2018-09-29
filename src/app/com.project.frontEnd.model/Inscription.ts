import {Etudiant} from "./Etudiant";
import {Classe} from "./Classe";
import {AnneeScolaire} from "./AnneeScolaire";

export class Inscription {


  public idInscription:number;
  public etudiant:Etudiant=new  Etudiant();
  public classe:Classe=new Classe();


  constructor() {}

}
