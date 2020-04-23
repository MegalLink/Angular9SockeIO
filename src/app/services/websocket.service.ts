import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus=false;
  public usuario:Usuario;
  constructor(private socket: Socket,private router:Router) { 
    this.checkStatus();
    this.cargarStorage();
  }
  
  //ESTADO SERVIDOR
  checkStatus(){
    this.socket.on('connect',()=>{
      console.log('Conectado al servidor');
      this.socketStatus=true;
      this.cargarStorage();
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

  logoutWs(){
    this.usuario=null;
    localStorage.removeItem('usuario');
    const payload={
      nombre: 'sin-nombre'
    }
    this.emit('configurar-usuario',payload,()=>{  })
    this.router.navigate([''])

  }
  guardarStorage(){
    localStorage.setItem('usuario',JSON.stringify(this.usuario));
  }
  cargarStorage(){
    if(localStorage.getItem('usuario')){
      
      this.usuario= JSON.parse(localStorage.getItem('usuario'));
      this.loginWs(this.usuario.nombre)
    }
  }
  getUsuario(){
    return this.usuario;
  }
}
