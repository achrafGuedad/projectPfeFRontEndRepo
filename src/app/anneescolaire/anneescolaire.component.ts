import { Component, OnInit } from '@angular/core';
import {AnneeScolaire} from '../com.project.frontEnd.model/AnneeScolaire';
import {anneescolaire} from '../service/anneescolaire';
import {Observable} from 'rxjs/Rx';
import {FormBuilder, FormGroup, FormArray, FormControl, NgForm} from '@angular/forms';
import {FiliereService} from '../service/FiliereService';
import {Filiere} from '../com.project.frontEnd.model/Filiere';
import {ClasseService} from "../service/ClasseService";
import {Classe} from "../com.project.frontEnd.model/Classe";
import {Router} from "@angular/router";

@Component({
  selector: 'app-anneescolaire',
  templateUrl: './anneescolaire.component.html',
  styleUrls: ['./anneescolaire.component.css']
})
export class AnneescolaireComponent implements OnInit {


  // PAGINATION VARIABLE

  page:number=1;
  size:number=5;
  totalItems:any;
  activatePanelSave:number=0;

   //DATA RETRIEVED
   public listeYears: Array<AnneeScolaire>=[];
   public listeClasses: Array<Classe>=[];

  //NgModel
  public idanneeScolaire:number;

  constructor(private ass: anneescolaire,private router:Router,private classeService: ClasseService) {

  }

  ngOnInit() {
    this.getAllYears();

  }

  //Get Total Year USED IN LIST BOX ABOVE
  public getAllYears() {

    this.ass.getAllYears().subscribe(
      (data) => {
        this.listeYears = data;


      }, (error) => {
        console.log(error);
      }
    );

  }

  // GET ALL CLASSES BY YEAR
    public loadClasses(anneeScolaire,page,size) {
      page=this.page-1;
      size=this.size;
     this.classeService.getAllClassesByYear(anneeScolaire,page,size).subscribe(

       (data)=>{
             this.getTotalFields();
             this.listeClasses=data;

       },
       (error)=>{
         console.log(error)

       }
     );

    }


  // COUNT CLASSES FIELDS
  public getTotalFields(){

    this.classeService.getTotalFieldsOfClasse(this.idanneeScolaire).subscribe(

      (data)=>{
        this.totalItems=data;
        console.log(this.totalItems);

      },(error)=>{
        console.log(error);
      }
    );
  }


    //On SUBMIT
  public onSubmit(form:NgForm) {

    let year: AnneeScolaire = new AnneeScolaire();
    year.anneeScolaire = form.value['year'];
    year.dateDebutSemestre_1 = form.value['dateDebutS_1'];
    year.dateFinSemestre_1 = form.value['dateFinS_1'];
    year.dateDebutSemestre_2 = form.value['dateDebutS_2'];
    year.dateFinSemestre_2 = form.value['dateFinS_2'];
    this.saveYear(year);
    //console.log(year);
    this.activatePanelSave=1;
    form.resetForm();


  }

  //LOAD PAGE
  public loadPage(page){}


  public hidenPanelSave(){
    this.activatePanelSave=0;

  }

  public saveYear(year:AnneeScolaire){
   this.ass.saveYear(year).subscribe(

     (data)=>{
       console.log('bien bien');
       this.getAllYears();
     },
     (error)=>{console.log(error)}
   );

  }















  }













