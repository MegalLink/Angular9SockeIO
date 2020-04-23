import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( public wsS:WebsocketService) { }

  sendMessage(mensaje:string){
    const payload={
      de: this.wsS.getUsuario().nombre,
      cuerpo: mensaje
    };
    this.wsS.emit('mensaje',payload);
  }
  getMessages(){
    return this.wsS.listen('mensaje-nuevo');
  }

  getMessagesPrivate(){
    return this.wsS.listen('mensaje-privado');
  }
  getUsuariosActivos(){
    return this.wsS.listen('usuarios-activos');
  }
  emitirUsuariosActivos(){
    this.wsS.emit('obtener-usuarios');
  }
 
}



