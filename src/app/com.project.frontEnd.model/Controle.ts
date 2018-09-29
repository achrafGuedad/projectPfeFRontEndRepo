import {Etudiant} from "./Etudiant";
import {Classe} from "./Classe";
import {Matiere} from "./Matiere";
import {User} from "./User";

export class Controle {

  public idControle:number;
  public etudiant :Etudiant=new Etudiant();
  public classe:Classe=new Classe();
  public matiere:Matiere=new Matiere();
  public prof :string;
  public note:number;
  public numeroControle:number;

  constructor(){}
}
