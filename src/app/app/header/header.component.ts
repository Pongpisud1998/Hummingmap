import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebserviceService } from 'src/app/service/webservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router:Router,
    ) {
      
    }

  ngOnInit(): void {
    if(localStorage.getItem('user_data')!=null&&localStorage.getItem('user_data')!=undefined){
      this.router.navigateByUrl('map')
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

}
