import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebserviceService } from 'src/app/service/webservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:any = "";
  password:any = "";

  constructor(
    private webservice:WebserviceService,
    private router:Router,
  ) {}

  ngOnInit(): void {
  }

  login(){
    // this.webservice.login({username:this.username,password:this.password}).then((res:any)=>{
    //   if(res){
    //     localStorage.setItem("user_data",JSON.stringify(res));
    //     this.router.navigateByUrl('map');
    //   }
      
    // })
  }

}
