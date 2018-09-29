import {User} from "./User";

export class  Etudiant{

    immat:number;
    psw:string;
    nom:string;
    prenom:string;
    email:string;
    numTel:string;

    user:User=new User();

    constructor(){}

}
