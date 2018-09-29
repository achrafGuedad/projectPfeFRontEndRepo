import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../service/AuthenticationService";
import {Classe} from "../com.project.frontEnd.model/Classe";
import {ControleService} from "../service/ControleService";
import {NgForm} from "@angular/forms";
import {Etudiant} from "../com.project.frontEnd.model/Etudiant";
import {Planing} from "../com.project.frontEnd.model/Planing";
import {Controle} from "../com.project.frontEnd.model/Controle";

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class ControleComponent implements OnInit {

  //Paginnation
  page: number = 1;
  size: number = 8;
  public totalItems: any;
  public activatePanelSave: number = 0;
  //-------
  private user:string;
  public   idEtudiant;
  //DATA BINDING
  public classe:number;
  public activatePanelMatier:number=0;

  // DATA RETRIEVED FROM REST
  public  listeClasse:Array<Classe>=[];
  public  listeMatiere:Array<Planing>=[];
  public  listeEtudiant:Array<Etudiant>=[];

  constructor(private  auth:AuthenticationService,private controleService:ControleService) { }

  ngOnInit() {

    this.showUser();
    this.getClassesOfTeacher();
  }


  //load User

  showUser(){
    this.user=this.auth.loadUser();
  }


  //GET  Classes of  teacher X
  getClassesOfTeacher() {
    this.controleService.getPlaningForProf(this.user).subscribe(
      (data) => this.listeClasse = data,
      (error)=>console.log(error)
    );
  }


  //chercherMatiereEtEtudiant
  public  chercherMatiereEtEtudiant(){
    this.getTotalStudentsOfClass();
    this.getMatiereOfClass();
    this.getStudentsOfClass(this.page-1,this.size);

  }

  public  onSubmit(f:NgForm){
    let controle:Controle=new Controle();

    controle.etudiant.immat=this.idEtudiant;
    controle.classe.idClasse=Number(this.classe);
    controle.matiere.idMatiere=Number(f.value['matiere']);
    controle.prof=this.auth.loadUser();
    controle.note=Number(f.value['note']);
    controle.numeroControle=Number(f.value['numeroControle']);

    this.saveNoteConrole(controle);
  }


  // get Etudiant Id From Html
  public  getEtudiant(id){
    this.idEtudiant=id;
  }

  //Load Page
  public  loadPage(page){
    this.getTotalStudentsOfClass();
    this.getStudentsOfClass(page-1,this.size);}


  //chercher Matiere
  getMatiereOfClass(){
    this.controleService.getMatiereOfClass(Number(this.classe),this.user).subscribe(

      (data)=>{

        this.listeMatiere=data;
        console.log(this.listeMatiere);
        this.activatePanelMatier=1;


        console.log(data)
      },
      (error)=>{console.log(error)}
    );
  }

  // chercher etudiants de la classe X .....!!!!
  getStudentsOfClass(page:number,size:number){
    this.controleService.getStudentsOfClass_Api(Number(this.classe),page,size).subscribe(
      (data:Etudiant[])=>{

        this.listeEtudiant=data;
        this.activatePanelMatier=1;
        console.log(data);
      },(error)=>{
        console.log(error);
      }
    );
  }


  public getTotalStudentsOfClass(){
    this.controleService.getTotalStudentsOfClass_Api(Number(this.classe)).subscribe(

      (data)=>{
        this.totalItems=data;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

// saveNoteControle
  public saveNoteConrole(controle :Controle)
  {
    this.controleService.saveNoteControle_Api(controle).subscribe(
      (data)=> {
        console.log('good saved');
        alert('données enregistées');
        }
      ,
      (error)=> console.log(error)
    );
  }
}
