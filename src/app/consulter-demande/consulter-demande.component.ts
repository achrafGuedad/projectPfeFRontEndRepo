import { Component, OnInit } from '@angular/core';
import {PapierService} from "../service/PapierService";
import {DemandePapier} from "../com.project.frontEnd.model/DemandePapier";

@Component({
  selector: 'app-consulter-demande',
  templateUrl: './consulter-demande.component.html',
  styleUrls: ['./consulter-demande.component.css']
})
export class ConsulterDemandeComponent implements OnInit {

  page: number = 1;
  size: number = 4;
  totalItems: any;
  activatePanelSaveFiliere: number = 0;

  public listeDemande:Array<DemandePapier>=[];

  constructor(private  papierService: PapierService) {
  }

  ngOnInit() {
    this.getTotalItems();
    this.getListDemandes(this.page-1,this.size);
  }


  loadPage(page) {
    this.getTotalItems();
    this.getListDemandes(page-1,this.size);
  }


  public getListDemandes(page: number, size: number) {

    this.papierService.getListDemande_Api(page,size).subscribe(
      (data)=>this.listeDemande=data,(error)=>console.log(error)
    );
  }

  public getTotalItems(){
    this.papierService.getTotalDemande_Api().subscribe(
      (data)=>this.totalItems,(error)=>console.log(error)
    );
  }


  updateState(idDemande){

    let demande:DemandePapier=new DemandePapier();
    demande.idDemandePapier=idDemande;

    this.papierService.updateState_Api(demande).subscribe(
      (data)=>{
        alert("Données Enregistrées");
        this.getTotalItems();
        this.getListDemandes(this.page -1,this.size);
      },
      (error)=>{console.log(error)}
    );
  }





}
