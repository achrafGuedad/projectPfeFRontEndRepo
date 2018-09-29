import { Component, OnInit } from '@angular/core';
import {NiveauService} from '../service/NiveauService';
import {Niveau} from '../com.project.frontEnd.model/Niveau';
import {FiliereService} from '../service/FiliereService';
import {Filiere} from '../com.project.frontEnd.model/Filiere';
import {NgForm} from '@angular/forms';
import {Router} from "@angular/router";
import {stringify} from "@angular/core/src/util";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../service/AuthenticationService";



@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.css']
})
export class NiveauComponent implements OnInit {


   filiere :Filiere=new Filiere();
   niveau: Niveau=new Niveau();
   listeFiliere: Array<Filiere> = [];
   listeNiveau: Array<Niveau>=[];

  page:number=1;
  size:number=4;
  totalItems:any;
  activatePanelSaveFiliere:number=0;



     constructor(private niveauService: NiveauService, private filiereservice: FiliereService,private router:Router,private auth:AuthenticationService) { }

  ngOnInit() {

    this.getAllNiveau(this.page-1,this.size);
    this.getAllFiliere();

  }

  getAllFiliere() {
    this.filiereservice.getAllFiliereWithoutpagination().subscribe(
      (data) => {
        this.getTotalFields();
        this.listeFiliere = data;

        console.log(this.listeFiliere);
      },
      (error) => {
      });
  }




  public deleteNiveau(idNiveau:number) {

    if( confirm("Voullez vous continuer  la suppression")==true) {
      this.niveauService.deleteiveauById(idNiveau)
        .subscribe(
          () => {
            console.log('rah tmseh');
            this.getAllNiveau(0,2);
            alert('Données Supprimées');
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );

    }
    else {
      console.log("okay God")
    }

  }

  loadPage(page:number){

    let myPage= page-1;
    this.getAllNiveau(myPage,this.size);

  }

  public onRedirect(){

    this.activatePanelSaveFiliere=0;
    this.getAllNiveau(this.page-1,this.size);
  }


  // GET ALL NIVEAY
  public getAllNiveau(page :number,size:number) {
    this.getTotalFields();
    this.niveauService.getAll(page,size).subscribe(
      (data) => {this.listeNiveau = data},
      (error)=>{console.log(error);

      }
    );
  }




  onSubmit(form:NgForm){


    let niveau:Niveau=new Niveau();
    niveau.libelle=form.value['libelle'];
    niveau.filiere.codeFiliere=Number(form.value['idFiliere']);
    console.log(niveau);

    this.saveNiveau(niveau);
    this.activatePanelSaveFiliere=1;

  }

  public saveNiveau(niveau:Niveau) {

    this.niveauService.saveNiveau(niveau).subscribe(
      () => {
        console.log('Enregistrement terminé !');



      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
    this.router.navigateByUrl('Home');
    this.router.navigateByUrl('Niveau');
  }

  public getTotalFields(){
    this.niveauService.CountLevels().subscribe(
      (data)=>{
        this.totalItems=data;
        console.log(this.totalItems);
      },(error)=>{}
    );
  }


}
