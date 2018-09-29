import { Component, OnInit } from '@angular/core';
import {NiveauService} from "../service/NiveauService";
import {anneescolaire} from "../service/anneescolaire";
import {Niveau} from "../com.project.frontEnd.model/Niveau";
import {AnneeScolaire} from "../com.project.frontEnd.model/AnneeScolaire";
import {NgForm} from "@angular/forms";
import {Classe} from "../com.project.frontEnd.model/Classe";
import {ClasseService} from "../service/ClasseService";

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {





   //---------------------------------------
   anneeScolaireList:Array<AnneeScolaire>=[];
   listeClasse:Array<Classe>=[];
   public listeNiveau:Array<Niveau>=[];
   public idAnneeScolaireModel:number;
   public idYear:number;
  //PAGINATION VARIBLES
  page:number=1;
  size:number=5;
  totalItems:any;
  public activatePanelSave:number=0;
  //DATA BINDING VARIABLES
  public activateTr:number=0;
  public activateTr_2:number=0;
  public myclasse:Classe=new Classe();


  constructor( private niveauService: NiveauService,private  anneeScolaireService:anneescolaire,private classeService:ClasseService) { }

  ngOnInit() {

    this.getAllLevels();
    this.getAllAnneeScolaire();

}


  // GET ALL ANNEE SCOLAIRE
  getAllAnneeScolaire() {
    this.anneeScolaireService.getAllYears().subscribe(
      (data) => this.anneeScolaireList = data,
      (error)=>  console.log(error)
    );
  }

  hidenPanelSave(){
    this.activatePanelSave=0;

  }

  onSubmit(f:NgForm){
    let classe:Classe=new Classe();

    classe.anneeScolaire.idAnneeScolaire=Number(f.value['idAnneeScolaire']);
    classe.niveau.idNiveau=Number(f.value['idNiveau']);
    classe.libelle=f.value['codeClasse'];
    this.saveClasse(classe);
    this.activatePanelSave=1;


  }

  // GET ALL NIVEAU ON LIST
  getAllLevels(){
    this.niveauService.getAllOnList().subscribe(
      (data)=>{this.listeNiveau=data;}
      , (error)=>{console.log(error)}
    );
  }

  // SAVE CLASSE
  saveClasse(classe:Classe) {
    this.classeService.saveClasseApi(classe).subscribe(
      (data:Classe) => {
        console.log('Enregistrement terminé !');
        this.activateTr=1;
        this.activateTr_2=0;
        //this.getAllClassesByAnnee(this.page-1,this.size);



      },
      (error) => {
        console.log('Erreur ! : ' + error);
      });


  }
   loadPage(page){
       this.getAllClassesByAnnee(page-1,this.size);
   }

  getAllClassesByAnnee(page:number,size:number)
  { this.getToalItems();
    this.classeService.getAllClassesByYear(this.idAnneeScolaireModel,page,size).subscribe(
      (data)=>
                    this.listeClasse=data,
      (error)=>console.log(error)
    );
  }
  chercherClasse(){
    this.activateTr=0;
    this.activateTr_2=1;
    this.getAllClassesByAnnee(this.page-1,this.size);
    //console.log(typeof this.idAnneeScolaireModel)

  }

    // GET TOTAL ITEMS
  getToalItems(){
    this.classeService.getTotalFieldsOfClasse(Number(this.idAnneeScolaireModel)).subscribe(
      (data)=>{this.totalItems=data;},
      (error)=>{console.log(error)}
    );
  }




 onChange(n){console.log(n)}



}
