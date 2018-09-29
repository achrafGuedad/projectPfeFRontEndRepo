import { Component, OnInit } from '@angular/core';
import {FiliereService} from '../service/FiliereService';
import {Filiere} from '../com.project.frontEnd.model/Filiere';
import {FormArray, FormBuilder, FormGroup,NgForm} from '@angular/forms';
import {AuthenticationService} from "../service/AuthenticationService";
import {HttpClient, HttpHeaderResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {ResponseWrapper} from "../ResponseWrapper";
import {Router} from "@angular/router";




@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.css']
})
export class FiliereComponent implements OnInit {


    listFiliere: any;
   filiere: Filiere=new Filiere();
   userForm: FormGroup;
    addTR: number=0;
    activatePanelSaveFiliere:number=0;
    //-- ------------
  private  resp:ResponseWrapper;
   page:number=1;
   size:number=4;
   totalItems:any;




  constructor(private filiereservice: FiliereService,private formBuilder: FormBuilder,private auth:AuthenticationService,private http:HttpClient,private router:Router) { }

  ngOnInit() {

    this.getAllFiliere(this.page-1,this.size);


    //console.log(this.auth.loadJWT());
  }
  /*------------------------------ -     interaction with the service layer         -----------------------------------------------------------*/
  loadPage(page:number){
    let myPage= page-1;

    this.getAllFiliere(myPage,this.size);

  }
  headers:any;
  // the whole list of Filiere
    getAllFiliere(page :number,size:number) {
       this.filiereservice.getAllFiliere(page,size).subscribe(
         (data)=>{
           this.getTotalFields();
           this.listFiliere=data;

           console.log(this.listFiliere);
         /*(resp)=>{
           // display its headers
           const keys = resp.headers.keys();
           this.headers = keys.map(key =>
             `${key}: ${resp.headers.get('X-Total-Count')}`);

           this.totalItems=keys;
           console.log(this.totalItems);
           // access the body directly, which is typed as `Config`.
           this.listFiliere = { ... resp.body };

           console.log(this.listFiliere);
*/


             //console.log( data.headers.get('X-Total-Count'));
            // console.log(this.listFiliere);
             //console.log(this.totalItems);

           },
           (error)=>{
             console.log(error)
           }
         );


           /*.subscribe(
          (data: any) =>{

            console.log(data['X-Total-Count']);*/
          //let  headers= new HttpHeaderResponse();
         // console.log(headers.headers.get('X-Total-Count'));

         // let  headers= new HttpHeaderResponse();
         /* headers.set('Content-Type', 'text/json');
          headers.append('Access-Control-Allow-Methods', 'GET');
          headers.append('Access-Control-Allow-Origin', '*');
          headers.append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method");
*/

          //console.log('headers'+);
         // console.log('listFiliere'+JSON.stringify(this.listFiliere));






    /*    },
      (error)=>{console.log(error)}
      );*/

     /* this.auth.getAllFiliere().subscribe(
        (data) =>{ console.log(data)},
        (error)=>{console.log(error)}
      );*/
    }

    public getTotalFields(){
      this.filiereservice.CountFiliere().subscribe(
        (data)=>{
          this.totalItems=data;
          console.log(this.totalItems);
        },(error)=>{}
      );
    }
  onredirect(){
       this.activatePanelSaveFiliere=0;
    this.getAllFiliere(this.page-1,this.size);
    }

    public saveFiliere(filiere:Filiere){
    this.filiereservice.saveFiliere(filiere).subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
    this.router.navigateByUrl('Home');
    this.router.navigateByUrl('Filiere');
  }
  /*------------------------------ --------------  -------------------------------------------------------*/

    //THE PERSIST OF ONE OBJECT FILIERE
  onSubmit(form:NgForm){

    this.filiere.libelle=form.value['libelle'];
    this.filiere.dateCreation=form.value['dateCreation'];
    this.saveFiliere(this.filiere);
    this.activatePanelSaveFiliere=1;

  }
   /*getFiliereById(codeFiliere:number){
    this.filiereservice.getFiliereById(codeFiliere).subscribe(
      data => this.filiere = data
    );
   }
*/

// code building form reactive
  initForm() {
    this.userForm = this.formBuilder.group({
      libelle:'',
      dateCreation:''

    });

  }




  getControlFilieres(): FormArray {
    return this.userForm.get(['libelle']) as FormArray;
  }
  onAddFiliere() {

      const newHobbyControl = this.formBuilder.control(null);
      this.getControlFilieres().push(newHobbyControl);
      console.log("bien crééer");
       this.initForm();
   /* const formValue = this.userForm.value;
    console.log('------------------------- after click');
    console.log('valeurs  des formControl: '+formValue['filieres'].length);
    */

    }


   deleteFiliere(idFiliere:number) {
     if (confirm('Voullez  vous continuer la suppression') == true) {
       this.filiereservice.deleteFiliereByIdd(idFiliere).subscribe(
         () => {
           console.log('Suppression  terminée !');
           this.getAllFiliere(0,4);
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









}
