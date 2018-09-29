import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./service/AuthenticationService";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {


  panelError:number=0;

  ngOnInit(){


  }
  constructor(public authenticationService:AuthenticationService,private router:Router) { }

  onLogin(formData){

    this.authenticationService.login(formData).subscribe(
      data=>{
        let jwtToken=data.headers.get('authorization');
        console.log(jwtToken);
        this.authenticationService.saveToken(jwtToken);

        this.router.navigateByUrl('Niveau');
      },
      error=>{
        this.panelError=1;
      }
    )
  }

  onLogOut(){
    this.authenticationService.logOut();


  }































}
