import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../service/AuthenticationService";
import {Absence} from "../com.project.frontEnd.model/Absence";
import {AbsenceService} from "../service/AbsenceService";

@Component({
  selector: 'app-absence-student',
  templateUrl: './absence-student.component.html',
  styleUrls: ['./absence-student.component.css']
})
export class AbsenceStudentComponent implements OnInit {


  user:string;
//Paginnation
  page: number = 1;
  size: number = 8;
  public totalItems: any;

  //DATA BINDING VARIABLES
  public showPanelTr:number=0;

  // data retrieved from rest

  listAbsence:Array<Absence> =[];

  constructor(private auth:AuthenticationService,private absenceService:AbsenceService) { }

  ngOnInit() {

    this.loadUser();
    this.getTotalField();
    this.absenceService.getStudentAbsence_Api(this.user,this.page-1,this.size).subscribe(

      (data)=>{
        this.showPanelTr=1;
        this.listAbsence=data;
      },
      (error)=>{console.log(error)}
    );
  }



 // LOAD USER
  loadUser(){
    this.user=this.auth.loadUser();

  }

  // get Total fields
  getTotalField(){
    this.absenceService.getTotalStudentAbsence_Api(this.user).subscribe(

      (data)=>data=this.totalItems,
      (error)=>console.log(error)
    );
  }

  //load page
  loadPage(page){

    this.getTotalField();
    this.absenceService.getStudentAbsence_Api(this.user,page-1,this.size).subscribe(

      (data)=>{
        this.showPanelTr=1;
        this.listAbsence=data;
      },
      (error)=>{console.log(error)}
    );
  }

}
