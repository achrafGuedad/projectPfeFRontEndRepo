import { Component, OnInit } from '@angular/core';
import {AdministrationService} from "../service/AdministrationService";
import {User} from "../com.project.frontEnd.model/User";
import {NgForm} from "@angular/forms";
import {appRole} from "../com.project.frontEnd.model/appRole";
import {Filiere} from "../com.project.frontEnd.model/Filiere";
import {Router} from "@angular/router";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {


  //data retreived
  public listeUsers: Array<User> = [];
  public listeUsersRole: Array<appRole> = [];


  //-- ------------


  page: number = 1;
  size: number = 3;
  public totalItems: any;
  public activatePanelSave: number = 0;

  constructor(private adminService: AdministrationService,private router:Router) {
  }

  ngOnInit() {

    this.getAllUsers();
  }


  getAllUsers() {
    this.getTotalFields();
    this.adminService.getAllUsers().subscribe(
      (data: User[]) => {

        this.listeUsers = data;

        //this.listeUsersRole=data.userRoles;
        console.log(this.listeUsers);
      },
      (error) => {
        console.log(error)
      }
    );

  }


  // GET TOTAL FIELDS
  public getTotalFields() {
    this.adminService.CountFields().subscribe(
      (data) => {
        this.totalItems = data;
        console.log(this.totalItems);
      }, (error) => {
      }
    );
  }

  //HIDE PAEL SAVE
  hidenPanelSave() {
    this.activatePanelSave=0;
    this.getAllUsers();
  }



  //CREATE USER
  public saveUser(user:User,role:string){
    this.adminService.saveUser(user,role).subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
    this.router.navigateByUrl('Home');
    this.router.navigateByUrl('Admin');
  }

  //ON SUBMIT
  onSubmit(form:NgForm){
   let user:User=new User();
   let role:string;
   user.username=form.value['username'];
   user.password=form.value['password'];

    role=form.value['role'];

    this.saveUser(user,role);
    this.activatePanelSave=1;

  }

  // DELETE USER BY ID
  deleteUser(iduser) {
    if (confirm('Voullez  vous continuer la suppression') == true) {
      this.adminService.deleteUserById(iduser).subscribe(
        () => {
          console.log('Suppression  terminée !');
          this.getAllUsers();
          alert('Données Supprimées');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    }
    else {
      console.log('xoxox');
    }
    }

    //LOAD PAGE
  loadPage(page:number){
    let myPage= page-1;

    this.getAllUsers();

  }



}
