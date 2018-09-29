import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Matiere} from "../com.project.frontEnd.model/Matiere";
import {MatiereService} from "../service/MatiereService";
import {CreatePlaningService} from "../service/CreatePlaningService";
import {User} from "../com.project.frontEnd.model/User";
import {Salle} from "../com.project.frontEnd.model/Salle";
import {Planing} from "../com.project.frontEnd.model/Planing";

@Component({
  selector: 'app-create-planing',
  templateUrl: './create-planing.component.html',
  styleUrls: ['./create-planing.component.css']
})
export class CreatePlaningComponent implements OnInit {

  //RETRIEVED VARIABLES
  public listeMatiere:Array<Matiere>=[];
  public listeProf:Array<User>=[];
  public listeSalle:Array<Salle>=[];
  public listePlan:Array<Planing>=[];


  //PAGINATION VARIBLES
  page:number=1;
  size:number=5;
  totalItems:any;
  public activatePanelSave:number=0;

  public myData:number=0;
  public showPanelTr:number=0;
  //--------------------------------------------------------
   // ID classe retrieved from planing component
  idClasse:number;
  idClasseNumber:number;
  constructor(private _Activatedroute:ActivatedRoute,private matiereService:MatiereService,private createPlaningService:CreatePlaningService) { }

  ngOnInit() {

    this.idClasse=this._Activatedroute.snapshot.params['idClasse'];
     this.getAllSalle();
    this.matiereService.getMatiereByIdClasseApi(this.idClasse).subscribe(

      (data:Matiere[])=>{
        this.listeMatiere=data;
        this.myData=1;
        console.log(data);
    },
    (error)=>{console.log(error)}
     );
    this.getAllTeachers();
  }


  // on Submit
  public  onSubmit(f:NgForm){
    let plan:Planing=new Planing();

    plan.matiere.idMatiere=Number(f.value['matiere']);
    plan.jour=f.value['jour'];
    plan.heureDebutSeance=f.value['heureDepart'];
    plan.heurFinSeance=f.value['heureFin'];
    plan.classe.idClasse=Number(this.idClasse);
    plan.prof.idUser=Number(f.value['prof']);
    plan.salle.idSalle=Number(f.value['salle']);
    this.savePlan(plan);

      }
  //save plan
  public savePlan(plan:Planing){
    this.createPlaningService.savePlanApi(plan).subscribe(

      (data)=>{
        console.log('saved');
        this.showPanelTr=1;
        this.getPlaningByClassId();

      },(error)=>{ console.log(error)}
    );
  }

  public loadPage(page){}
  public hidenPanelSave(){}




  //GET ALL TEACHERS
  public getAllTeachers(){
   this.createPlaningService.getAllProfessors().subscribe(

     (data)=>{

       console.log(data);
       this.listeProf=data;


     },
     (error)=>{
       console.log(error);

     }
   );

  }

  //GET ALL SALLE
  getAllSalle(){
    this.createPlaningService.getAllSalle().subscribe(
      (data)=>{
        this.listeSalle=data
      },
      (error)=>{console.log(error)}
    );
  }



  //get Planing By idClasse
  public getPlaningByClassId(){
    this.createPlaningService.getPlaning(this.idClasse).subscribe(
      (data)=>{
        this.listePlan=data;
      },(error)=>{console.log(error)}
    );
  }



}
