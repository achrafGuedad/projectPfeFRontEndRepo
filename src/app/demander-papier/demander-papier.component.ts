import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../service/AuthenticationService";
import {PapierService} from "../service/PapierService";
import {Papier} from "../com.project.frontEnd.model/Papier";
import {Etudiant} from "../com.project.frontEnd.model/Etudiant";
import {DemandePapier} from "../com.project.frontEnd.model/DemandePapier";

@Component({
  selector: 'app-demander-papier',
  templateUrl: './demander-papier.component.html',
  styleUrls: ['./demander-papier.component.css']
})
export class DemanderPapierComponent implements OnInit {

  user:string;
 //pagination
  page:number=1;
  size:number=4;
  totalItems:any;
  activatePanelSaveFiliere:number=0;
  //-----------
  // data retrieved from rest
  public listePapier:Array<Papier>=[];
  constructor(private auth:AuthenticationService,private papierService:PapierService) { }

  ngOnInit() {
    this.loadUser();
    this.loadListPapier();
  }


 //loadUser
  loadUser(){

    this.user=this.auth.loadUser();
  }

  //-------------------------------------

   public loadListPapier(){
    this.papierService.getListPapier_Api().subscribe(

      (data)=>{

        this.listePapier=data;
      },
      (error)=> {
        console.log(error);
      }
    );


   }
   //--------------------------

  onSubmit(f:NgForm){
    let papier :Papier=new  Papier();
    let demandePapier:DemandePapier=new DemandePapier();
    papier.idPapier=Number(f.value['papier']);
    demandePapier.papier=papier;
    demandePapier.dateDemande=f.value['dateDemande'];
    demandePapier.etat="PAS ENCORE TRAITE";
    this.saveDemandePapier(demandePapier,this.user);


  }
  //--------------------------------

  // saveDemandePapier

  saveDemandePapier(dmdP:DemandePapier,username:string){
    this.papierService.saveDemandePapier_Api(dmdP,username).subscribe(

      (data)=>{
        alert('Données Enregistrées ');
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  loadPage(page){}


}
