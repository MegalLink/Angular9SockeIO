import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( public wsS:WebsocketService) { }

  sendMessage(mensaje:string){
    const payload={
      de: 'Jeferson',
      cuerpo: mensaje
    };
    this.wsS.emit('mensaje',payload);
  }
  getMessages(){
    return this.wsS.listen('mensaje-nuevo');
  }
 
}



