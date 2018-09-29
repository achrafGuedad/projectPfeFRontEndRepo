import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../service/AuthenticationService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-espaceetudiant',
  templateUrl: './espaceetudiant.component.html',
  styleUrls: ['./espaceetudiant.component.css']
})
export class EspaceetudiantComponent implements OnInit {

  constructor(private authService:AuthenticationService,private router :Router) { }

  ngOnInit() {

    this.authService.getAllFiliere().subscribe(
      (data)=>{console.log(data)},
      (error)=>{
        console.log(error);
         //this.authService.logOut();
         //this.router.navigateByUrl('/index');

      }

    )
  }

}
