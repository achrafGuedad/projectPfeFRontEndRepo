import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CreatePlaningService} from "../service/CreatePlaningService";
import {Planing} from "../com.project.frontEnd.model/Planing";

@Component({
  selector: 'app-show-planing',
  templateUrl: './show-planing.component.html',
  styleUrls: ['./show-planing.component.css']
})
export class ShowPlaningComponent implements OnInit {
 private idClasse:number;
 public showPanelTr:number=0;

 public listePlan:Array<Planing>=[];
  constructor(private _Activatedroute:ActivatedRoute,private createPlaningService:CreatePlaningService) { }

  ngOnInit() {
    this.idClasse=this._Activatedroute.snapshot.params['idClasse'];
    this.createPlaningService.getPlaning(this.idClasse).subscribe(
      (data)=>{
        this.showPanelTr=1;
        this.listePlan=data;
      },(error)=>{console.log(error)}
    );
  }



}
