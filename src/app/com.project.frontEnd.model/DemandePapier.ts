import {Etudiant} from "./Etudiant";
import {Papier} from "./Papier";


export class DemandePapier{

  public idDemandePapier:number;
  public papier:Papier=new Papier();
  public etudiant: Etudiant=new Etudiant();
  public dateDemande:string;
  public etat:string;

  constructor(){}

}
