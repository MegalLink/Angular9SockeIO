import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy {
 texto="";
 mensajesSubsciption:Subscription;
 mensajes:any[]=[];
 elemento:HTMLElement;
  constructor(public chS:ChatService) { }
  
  ngOnInit(): void {
    this.elemento=document.getElementById('chat-mensajes');
   this.mensajesSubsciption= this.chS.getMessages().subscribe(msg=>{
     //console.log(msg)
      this.mensajes.push(msg);
      setTimeout(()=>{
        this.elemento.scrollTop=this.elemento.scrollHeight;
      },50)
    })
  }
  ngOnDestroy(){
    this.mensajesSubsciption.unsubscribe();
  }
  enviar(){
    //console.log(this.texto);

    if(this.texto.trim().length===0){
      return;
    }
    this.chS.sendMessage(this.texto);
    this.texto="";
  }

}
