import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../service/AuthenticationService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public auth:AuthenticationService,private router:Router) { }

  ngOnInit() {
    this.showUser();
  }

onLogout(){
    this.auth.logOut();

    this.router.navigateByUrl('index');
  }
  public user:any;
showUser(){
  this.user=this.auth.loadUser();
  }
}



