import {Classe} from "./Classe";
import {Etudiant} from "./Etudiant";
import {Matiere} from "./Matiere";

export class Absence {

  classe:Classe=new Classe();
  etudiant:Etudiant=new  Etudiant();
  matiere:Matiere=new Matiere();
  jourAbsence :string;
  heureDeppartAbsence:string;
  heureFinAbsene:string;
  prof :string;

  constructor(){}


}
