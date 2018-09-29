import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../service/AuthenticationService";
import {NiveauService} from "../service/NiveauService";
import {MatiereService} from "../service/MatiereService";
import {Matiere} from "../com.project.frontEnd.model/Matiere";
import {NgForm} from "@angular/forms";
import {Niveau} from "../com.project.frontEnd.model/Niveau";
import {Router} from "@angular/router";

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {
  //PAGINATION VARIBLES
  page:number=1;
  size:number=3;
  totalItems:any;
  public activatePanelSave:number=0;

  //autres
  listeMatiere:Array<Matiere>=[];
  listeNiveau:Array<Niveau>=[];

  //Ng Model

  idNiveau:number;
  constructor(private router:Router,private auth:AuthenticationService,private niveauService: NiveauService,private matiereService:MatiereService) { }

  ngOnInit() {


    this.getAllNiveau();
  }


  public getAllMatiereByNiveau(page:number) {
    this.getTotalFields();
    this.matiereService.getMatiereByGroupApi(this.idNiveau,page,this.size).subscribe(
      (data) => {this.listeMatiere = data},
      (error)=>{console.log(error);

      }
    );
  }

  // GET TOTAL FIELDS
  public getTotalFields(){
    this.matiereService.CountMatiere(Number(this.idNiveau)).subscribe(
      (data)=>{
        this.totalItems=data;
        console.log('total Matiere '+this.totalItems);
      },(error)=>{console.log(error)}
    );
  }

  //ONSubmit

  public onSubmit(form:NgForm){
   let  matiere:Matiere=new  Matiere();
   matiere.libelle=form.value['libelle'];
   matiere.coeffitien=Number(form.value['coeficient']);
   let m=Number(form.value['idLevel']);
   this.idNiveau=m;
   matiere.niveau.idNiveau=m;

   console.log(matiere);
   this.saveMatiere(matiere);
   this.activatePanelSave=1;


  }
  // SAVE MATIERE
  public saveMatiere(matiere:Matiere){
    this.matiereService.saveMatiereApi(matiere).subscribe(
      (data)=>{
        console.log('good');

      },(error)=>{
        console.log('not good');
      }

    );
    this.router.navigateByUrl('Home');
    this.router.navigateByUrl('Matiere');
  }

  //GET ALL LEVELS
  public getAllNiveau() {

    this.niveauService.getAllOnList().subscribe(
      (data) => {
        this.listeNiveau = data;
        console.log(this.listeNiveau);
      },
      (error)=>{console.log(error);

      }
    );
  }

  // HIDE  SAVE INFORMATION PANEL
  hidenPanelSave(){
     let page =1;

    this.activatePanelSave=0;
    this.getAllMatiereByNiveau(page-1);
  }


  //LoadPage
  public loadPage(page:number){
    let myPage= page-1;
    this.getAllMatiereByNiveau(myPage);
  }


  // DELETE MATIERE
  deleteMatiere(idMatiere:number) {
    if (confirm('Voullez  vous continuer la suppression') == true) {
      this.matiereService.deleteMatiere(idMatiere).subscribe(
        () => {
          console.log('Suppression  terminée !');
          let page=1;
          this.getAllMatiereByNiveau(page -1);
          alert('Données Supprimées');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    }
    else {
      console.log('xoxox');
    }

  }
}
