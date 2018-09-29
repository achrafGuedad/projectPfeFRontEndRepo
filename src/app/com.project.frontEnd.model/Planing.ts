import {Matiere} from "./Matiere";
import {Salle} from "./Salle";
import {Classe} from "./Classe";
import {User} from "./User";


export class Planing{
  public jour:string
  public heureDebutSeance:string;
  public heurFinSeance:string;
  public matiere:Matiere=new Matiere();
  public prof:User=new User();
  public salle:Salle=new Salle();
  public  classe:Classe=new Classe();


constructor(){}
}
