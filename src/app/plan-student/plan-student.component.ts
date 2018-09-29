import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../service/AuthenticationService";
import {CreatePlaningService} from "../service/CreatePlaningService";
import {Planing} from "../com.project.frontEnd.model/Planing";

@Component({
  selector: 'app-plan-student',
  templateUrl: './plan-student.component.html',
  styleUrls: ['./plan-student.component.css']
})
export class PlanStudentComponent implements OnInit {

  private user:string;
  public showPanelTr:number=0;
  public plan:Array<Planing>=[]
  constructor(private auth:AuthenticationService,private planService:CreatePlaningService) { }

  ngOnInit() {

    this.user=this.auth.loadUser();
    this.planService.getPlaningOfStudent(this.user).subscribe(
      (data)=>{
        this.showPanelTr=1;
        this.plan=data;
        console.log(data);
      },
      (error)=>{
          console.log(error);
      }
    );
  }

}
