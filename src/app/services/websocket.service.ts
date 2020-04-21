import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus=false;
  public usuario:Usuario;
  constructor(private socket: Socket) { 
    this.checkStatus();
    this.cargarStorage();
  }
  //ESTADO SERVIDOR
  checkStatus(){
    this.socket.on('connect',()=>{
      console.log('Conectado al servidor');
      this.socketStatus=true;
    });
    this.socket.on('disconnect',()=>{
      console.log('Desconectado del servidor');
      this.socketStatus=false;
    });
  }
//EMITE CUALQUIER EVENTO
  emit(evento:string,payload?:any,callback?:Function){
    console.log(`Emitiendo ${evento}`)
      this.socket.emit(evento,payload,callback);
  }
  //ESCUCHA CUALQUIER EVENTO
  listen(evento:string){
    return this.socket.fromEvent(evento);

  }
  //LOGIN
  loginWs(nombre:string){
    console.log("Configurando",nombre)

    return new Promise((resolve,reject)=>{
      this.emit('configurar-usuario',{nombre},resp=>{
        this.usuario=new Usuario(nombre);
        this.guardarStorage();
       resolve();
      });
    })
    
  }
  guardarStorage(){
    localStorage.setItem('usuario',JSON.stringify(this.usuario));
  }
  cargarStorage(){
    if(localStorage.getItem('usuario')){
      this.usuario= JSON.parse(localStorage.getItem('usuario'));
    }
  }
  getUsuario(){
    return this.usuario;
  }
}
