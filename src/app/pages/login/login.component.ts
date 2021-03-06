import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 nombre:string="";
  constructor(public wsS:WebsocketService,private router:Router) { }

  ngOnInit(): void {
  }
  ingresar(){
    if(this.nombre.trim().length===0){
      return;
    }
    this.wsS.loginWs(this.nombre).then(()=>{
      this.router.navigate(['/mensajes'])
    })
  }

}
