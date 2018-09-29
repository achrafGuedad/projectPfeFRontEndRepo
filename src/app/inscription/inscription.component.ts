import { Component, OnInit } from '@angular/core';
import {Inscription} from "../com.project.frontEnd.model/Inscription";
import {ResponseWrapper} from "../ResponseWrapper";
import {NgForm} from "@angular/forms";
import {ClasseService} from "../service/ClasseService";
import {Classe} from "../com.project.frontEnd.model/Classe";
import {Etudiant} from "../com.project.frontEnd.model/Etudiant";
import {InscriptionService} from "../service/InscriptionService";
import {ReinscriptionService} from "../service/ReinscriptionService";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  ngm:number;
  show(a:any){console.log(a)}


  public etudiantDetail:Inscription=new Inscription();
  public listeClasse:Array<Classe>=[];
  public activatePanelSave:number=0;

  // DATA BINDING VARIABLES
  public activateTable=0;

  constructor(private classeService:ClasseService,private inscriptionService:InscriptionService,private reIn:ReinscriptionService) { }

  ngOnInit() {
    this.getAllClasses();
  }

  //GET ALL CLASSES

  getAllClasses(){

    this.reIn.getAllClasseOnCurrentDate().subscribe(

      (data)=>{
        this.activateTable=1;
        this.listeClasse=data;

      },
      (error)=>{
        console.log(error);
      }
    );
  }







  // CREATE ETUDIANT

  saveEtudiant(etudiant:Etudiant,role:string,idClasse:number){
this.inscriptionService.saveEtudiantApi(etudiant,role,idClasse).subscribe(

      (data:Inscription)=>{
        this.etudiantDetail=data;
        console.log(this.etudiantDetail);

      },
      (error)=>{console.log(error)}
    );

  }


  //  on submit
  onSubmit(f:NgForm){

    let etudiant:Etudiant=new Etudiant();


    let idClasse:number=Number(f.value['idClasse']);


    etudiant.nom=f.value['nom'];
    etudiant.prenom=f.value['prenom'];
    etudiant.email=f.value['email'];
    etudiant.numTel=f.value['numTel'];
    this.saveEtudiant(etudiant,"ETUDIANT",idClasse);
    this.activatePanelSave=1;


  }

  closePanelSave(){
    this.activatePanelSave=0;

  }

  loadPage(){}



}
