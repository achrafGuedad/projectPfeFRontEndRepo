import { Component, OnInit } from '@angular/core';
import {User} from "../com.project.frontEnd.model/User";
import {AuthenticationService} from "../service/AuthenticationService";
import {Router} from "@angular/router";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorPanel:number=0;

  constructor(private auth:AuthenticationService,private router:Router) { }

  ngOnInit() {
    this.auth.logOut();
    this.router.navigateByUrl('index');
  }



  onLogin(formData){

    this.auth.login(formData).subscribe(
      data=>{
        let jwtToken=data.headers.get('authorization');
        console.log(jwtToken);
        this.auth.saveToken(jwtToken);

        this.router.navigateByUrl('Home');
      },
      error=>{
        this.errorPanel=1;
      }
    )

  }
}
