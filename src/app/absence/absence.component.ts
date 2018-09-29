import {Component, Input, OnInit} from '@angular/core';
import {AnneeScolaire} from "../com.project.frontEnd.model/AnneeScolaire";
import {anneescolaire} from "../service/anneescolaire";
import {Inscription} from "../com.project.frontEnd.model/Inscription";
import {InscriptionService} from "../service/InscriptionService";
import {NgForm} from "@angular/forms";
import {Classe} from "../com.project.frontEnd.model/Classe";
import {EtudiantService} from "../service/EtudiantService";
import {Etudiant} from "../com.project.frontEnd.model/Etudiant";
import {MatiereService} from "../service/MatiereService";
import {Matiere} from "../com.project.frontEnd.model/Matiere";
import {ClasseService} from "../service/ClasseService";
import {DatePipe, Time} from "@angular/common";
import {Absence} from "../com.project.frontEnd.model/Absence";
import DateTimeFormat = Intl.DateTimeFormat;
import {AbsenceService} from "../service/AbsenceService";
import {AuthenticationService} from "../service/AuthenticationService";
import {Planing} from "../com.project.frontEnd.model/Planing";

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {








//-----------------------
  page: number = 1;
  size: number = 8;
  public totalItems: any;
  public activatePanelSave: number = 0;
  private user:string;

  //---------------------------
  public listePlan:Array<Planing>=[];
 public  listeClasse:Array<Classe>=[];
 public  listeMatiere:Array<Planing>=[];
 public  listeEtudiant:Array<Etudiant>=[];
 //-----------------------------------------
  // databinding input
  public matiere:number;
  public classe:number;
  public  etatPresent:boolean;
  public  etatAbsent:boolean=true;


  public idEtd:number;

  public activatePanelMatier:number=0;

  showUser(){
    this.user=this.auth.loadUser();
  }




  constructor(private  anneeScolaireService:anneescolaire,private inscriptionService:InscriptionService,private etudiantService:EtudiantService
              ,private matiereService:MatiereService,private classeServie:ClasseService,private absenceService:AbsenceService,
              private  auth:AuthenticationService)
                    { }

  ngOnInit() {

    this.showUser();
    this.getPlaingByProf();
    //this.getAllAnneeScolaire();
     //console.log(this.current)
  }



  // -------------------------------------------------------INTERACACTION AVEC LE SERVICE ----------------------------------
//GET  PLANING
  getPlaingByProf() {
    this.absenceService.getPlaningForProf(this.user).subscribe(
      (data) => this.listeClasse = data,
      (error)=>console.log(error)
    );
  }


  // get matiere and astudents by classe
    chercherMatiereEtClass(){
    this.getTotalStudentsOfClass();
     this.getMatiereOfClass();
     this.getStudentsOfClass(this.page-1,this.size);
    }
    //chercher Matiere
  getMatiereOfClass(){
    this.absenceService.getMatiereAndStudents(Number(this.classe),this.user).subscribe(

      (data)=>{

        this.listeMatiere=data;
        console.log(this.listeMatiere);
        this.activatePanelMatier=1;


        console.log(data)
      },
      (error)=>{console.log(error)}
    );
  }

  hidenPanelSave(){}
  updateAabsence(){}


  // chercher etudiants de la classe X .....!!!!
     getStudentsOfClass(page:number,size:number){
        this.absenceService.getStudentsOfClass_Api(Number(this.classe),page,size).subscribe(
      (data:Etudiant[])=>{

        this.listeEtudiant=data;
        this.activatePanelMatier=1;
        console.log(data);
      },(error)=>{
        console.log(error);
      }
    );
  }

  //getTotalStudentsOfClass

  public getTotalStudentsOfClass(){
    this.absenceService.getTotalStudentsOfClass_Api(Number(this.classe)).subscribe(

      (data)=>{
        this.totalItems=data;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  public loadPage(page){
    this.getTotalStudentsOfClass();
    this.getStudentsOfClass(page-1,this.size);
  }



  onSubmit(f:NgForm) {
    let absence: Absence;
    if (f.value['etat']==true)
    {
      absence= new Absence();

      absence.classe.idClasse=this.classe;
      absence.matiere.idMatiere=Number(f.value['matiere']);
      //absence.heureDeppartAbsence=f.value['heureDebut'];
      //absence.heureFinAbsene=f.value['heureFin'];
      absence.etudiant.immat=this.idEtd;
      absence.prof=this.auth.loadUser();
      absence.jourAbsence=f.value['jour'];
      absence.heureDeppartAbsence=f.value['heureDepart'];
      absence.heureFinAbsene=f.value['heureFin'];

      this.createAbsence(absence);
    }

      }



public getEtudiant(idEtd){
    this.idEtd=idEtd;
}






  //  CREATE ABSENCE
    createAbsence(absence:Absence){
    this.absenceService.ApiCreateAbsence(absence).subscribe(

      (data)=>alert('données enregistrées'),
      (error)=>console.log(error)
    );
    }




  // -------------------------------------------------------FIN INTERACACTION AVEC LE SERVICE ----------------------------------







/*
show(e,form:NgForm) {

this.absence=new Absence();
   this.absence.anneeScolaire.idAnneeScolaire=Number(this.annee);
   this.absence.classe.idClasse=this.classe;
   this.absence.etudiant.immat=Number(e);
   this.absence.matiere.idMatiere=Number(this.matiere);

   this.absence.jourAbsence=String(this.jourAbsence);
   this.absence.heureDeppartAbsence=String(this.heureDebutAbsence);
   this.absence.heureFinAbsene=String(this.heureFinAbsence);
   this.createAbsence(this.absence);




/*

  console.log('anneeScolaire' +typeof this.annee);
  console.log('classe' +this.classe);
  console.log('matiere' + this.matiere);
  console.log('-------------------------------------');
  console.log('etudiant'+e);
*/

  /*let jourAbsenceDate= String(this.jourAbsence);
  let heureAbsenceD=  String(this.heureDebutAbsence);
  let heureAbsenceF=  String(this.heureFinAbsence);

  console.log( 'jourAbsence'+typeof jourAbsenceDate);
  console.log( 'heureDebutAbsence'+typeof  heureAbsenceD);
  console.log( 'heureFinAbsence'+typeof  heureAbsenceF);
  console.log('etat absence' +typeof form.value['etat']);
}*/






}
