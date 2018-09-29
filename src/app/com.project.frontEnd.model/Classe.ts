import {Niveau} from "./Niveau";
import {AnneeScolaire} from "./AnneeScolaire";

export class Classe {
 idClasse:number;
 libelle:string;
 niveau:Niveau=new Niveau();
 anneeScolaire:AnneeScolaire=new AnneeScolaire();

 constructor() {}

}
