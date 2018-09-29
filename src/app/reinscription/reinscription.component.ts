import { Component, OnInit } from '@angular/core';
import {ReinscriptionService} from "../service/ReinscriptionService";
import {Classe} from "../com.project.frontEnd.model/Classe";
import {NgForm} from "@angular/forms";
import {Inscription} from "../com.project.frontEnd.model/Inscription";

@Component({
  selector: 'app-reinscription',
  templateUrl: './reinscription.component.html',
  styleUrls: ['./reinscription.component.css']
})
export class ReinscriptionComponent implements OnInit {

  // DATA RETRIEVED
  public listeClasse: Array<Classe> = [];
  public etudiantDetail:Inscription;

  // DATA BINDING VARIABLES
  public activatePanelSave: number = 0;
  public activateTr:number=0;

  constructor(private reinscriptionService: ReinscriptionService) {
  }

  ngOnInit() {

    this.getAllClassesInCurrent();
  }


  public getAllClassesInCurrent() {
    this.reinscriptionService.getAllClasseOnCurrentDate().subscribe(
      (data) => {
        this.listeClasse = data;
        console.log(this.listeClasse)

      }, (error) => {
        console.log(error)
      }
    );
  }


//close panel after saving etudiant
  closePanelSave() {
  }




// ONSUBMIT

  onSubmit(f:NgForm){

    let ins:Inscription=new Inscription();
    ins.etudiant.user.username=f.value['username'];
    ins.classe.idClasse=Number(f.value['idClasse']);
    console.log(typeof ins.classe.idClasse)
    console.log(ins)
    this.saveReinscription(ins);

  }

  //SAVE RE INSCRIPTION
  public  saveReinscription(inscription:Inscription){
    this.reinscriptionService.saveReinscriptionApi(inscription).subscribe(

      (data:Inscription)=> {

        this.etudiantDetail=new Inscription();
        this.etudiantDetail=data;
        this.activateTr=1;
      }, (error)=> {console.log(error)}
    );
  }
}
