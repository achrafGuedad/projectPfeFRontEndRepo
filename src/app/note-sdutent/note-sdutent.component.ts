import { Component, OnInit } from '@angular/core';
import {noteStudentService} from "../service/noteStudentService";
import {AuthenticationService} from "../service/AuthenticationService";
import {Controle} from "../com.project.frontEnd.model/Controle";

@Component({
  selector: 'app-note-sdutent',
  templateUrl: './note-sdutent.component.html',
  styleUrls: ['./note-sdutent.component.css']
})
export class NoteSdutentComponent implements OnInit {

   user:string;
  //DATA BINDING VARIABLES
  public showPanelTr:number=0;

  // DATA RETRIEVED FROM REST
  public listNote:Array<Controle>=[];


  //Paginnation
  page: number = 1;
  size: number = 8;
  public totalItems: any;


  constructor(private noteService:noteStudentService,private auth:AuthenticationService) { }

  ngOnInit() {
    this.loadUser();
    this.getTotalField();
    this.noteService.getNotesOfStudent_Api(this.user,this.page-1,this.size).subscribe(

      (data)=>{
        this.showPanelTr=1;
        this.listNote=data;
        },
      (error)=>{console.log(error)}
    );
  }


  loadUser(){
    this.user=this.auth.loadUser();
  }
  loadPage(page){

    this.getTotalField();
    this.noteService.getNotesOfStudent_Api(this.user,page-1,this.size).subscribe(

      (data)=>{
        this.showPanelTr=1;
        this.listNote=data;
      },
      (error)=>{console.log(error)}
    );
  }


  getTotalField(){
    this.noteService.getTotalFields(this.user).subscribe(

      (data)=>data=this.totalItems,
      (error)=>console.log(error)
    );
  }



}
