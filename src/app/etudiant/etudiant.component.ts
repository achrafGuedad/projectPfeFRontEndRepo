import { Component, OnInit } from '@angular/core';
import {anneescolaire} from "../service/anneescolaire";
import {ClasseService} from "../service/ClasseService";
import {AnneeScolaire} from "../com.project.frontEnd.model/AnneeScolaire";
import {Niveau} from "../com.project.frontEnd.model/Niveau";
import {Classe} from "../com.project.frontEnd.model/Classe";
import {NgForm} from "@angular/forms";
import {Etudiant} from "../com.project.frontEnd.model/Etudiant";
import {Inscription} from "../com.project.frontEnd.model/Inscription";
import {EtudiantService} from "../service/EtudiantService";
import {InscriptionService} from "../service/InscriptionService";
import {Router} from "@angular/router";
import {DateFormatter} from "@angular/common/src/pipes/deprecated/intl";

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {

  currenteDate: Date = new Date();

  anneeScolaireList: Array<AnneeScolaire> = [];
  listeClasse: Array<Classe> = [];

  inscription: number = 0;
  inscription_2: number = 0;
  reinscription: number = 0;

  //PERIST OF INSCRIPTION
  inscrirI: Inscription;
  inscrirR: Inscription = new Inscription();
  private etudiantI: Etudiant = new Etudiant();
  private etudiantTo: any;

  inscriptionsEtudiant: Array<Inscription> = [];


  constructor(private anneeScolaireService: anneescolaire, private classeService: ClasseService,
              private etudiantService: EtudiantService, private inscriptionService: InscriptionService, private router: Router) {
  }

  ngOnInit() {


  }


  /*getInscriptionsEtudiant(immat: number) {
    let id = Number(immat);
    this.inscriptionService.getInscriptionsEtudiantApi(id).subscribe(
      (data) => this.inscriptionsEtudiant = data
    );
  }
*/

}


