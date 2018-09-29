import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {Classe} from "../com.project.frontEnd.model/Classe";
import {anneescolaire} from "../service/anneescolaire";
import {ClasseService} from "../service/ClasseService";
import {AnneeScolaire} from "../com.project.frontEnd.model/AnneeScolaire";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-planing',
  templateUrl: './planing.component.html',
  styleUrls: ['./planing.component.css']
})
export class PlaningComponent implements OnInit {
  id:number;
//PAGINATION VARIBLES
  page:number=1;
  size:number=5;
  totalItems:any;
  public activatePanelSave:number=0;
  //DATA BINDING VARIABLES
  public activateTr:number=0;
  public listeClasse:Array<Classe>=[];
  public idAnneeScolaireModel:number;
  public anneeScolaireList:Array<AnneeScolaire>=[];

  constructor(private router:Router,private  anneeScolaireService:anneescolaire,private classeService:ClasseService) { }

  ngOnInit() {

    this.getAllAnneeScolaire();



  }




  getAllClassesByAnnee(page:number,size:number)
  {
    this.getToalItems();
    this.classeService.getAllClassesByYear(this.idAnneeScolaireModel,page,size).subscribe(
      (data)=>
        this.listeClasse=data,
      (error)=>console.log(error)
    );
  }

  // GET ALL ANNEE SCOLAIRE
  getAllAnneeScolaire() {
    this.anneeScolaireService.getAllYears().subscribe(
      (data) => this.anneeScolaireList = data,
      (error)=>  console.log(error)
    );
  }



  // GET TOTAL ITEMS
  getToalItems(){
    this.classeService.getTotalFieldsOfClasse(Number(this.idAnneeScolaireModel)).subscribe(
      (data)=>{this.totalItems=data;},
      (error)=>{console.log(error)}
    );
  }




  chercherClasse(){
    this.activateTr=1;
    this.getAllClassesByAnnee(this.page-1,this.size);
    //console.log(typeof this.idAnneeScolaireModel)

  }
   //Load page
  loadPage(page){
    this.getAllClassesByAnnee(page-1,this.size);
  }
  hidenPanelSave(){
    this.activatePanelSave=0;

  }

  public createPlaning(){}

  public getIdClasse(idClasse){
     //console.log(typeof idClasse)
    this.router.navigateByUrl('CreatePlaning/'+idClasse);
  }

  public getPlaning(idClasse){
    this.router.navigateByUrl('ShowPlaning/'+idClasse);
  }
}
