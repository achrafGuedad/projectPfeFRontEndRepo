import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../service/AuthenticationService";
import {PapierService} from "../service/PapierService";
import {DemandePapier} from "../com.project.frontEnd.model/DemandePapier";

@Component({
  selector: 'app-consulter-demandes-student',
  templateUrl: './consulter-demandes-student.component.html',
  styleUrls: ['./consulter-demandes-student.component.css']
})
export class ConsulterDemandesStudentComponent implements OnInit {
  user :string;

  page: number = 1;
  size: number = 7;
  totalItems: any;

  public listeDemades:Array<DemandePapier>=[];
  constructor(private auth:AuthenticationService,private papierService:PapierService) { }

  ngOnInit() {
    this.loaduser();
    this.countDemandStudent();
    this.getDemandsStudent(this.page-1,this.size);
  }
  loaduser(){

    this.user=this.auth.loadUser();
  }

  public getDemandsStudent(page:number,size:number){
    this.papierService.getDemandsOfStudent(this.user,page,size).subscribe(

      (data)=>{
        this.listeDemades=data;
      },(error)=>{
        console.log(error)
      }
    );
  }

  //---------------------------------------------

  public countDemandStudent(){
    this.papierService.countDemandsOfStudent_Api(this.user).subscribe(

      (data)=>{this.totalItems=data},(error)=>{console.log(error)}
    );
  }

//-----------------------------------

  loadPage(page){
    this.countDemandStudent();
    this.getDemandsStudent(page-1,this.size);
  }

}
