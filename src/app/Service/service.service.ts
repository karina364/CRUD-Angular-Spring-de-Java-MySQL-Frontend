import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Usuario } from '../modelo/Usuario';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  constructor(private http:HttpClient) { }

  Url = 'http://localhost:8080/usuarios';

  getUsuarios(){
    return this.http.get<Usuario[]>(this.Url);
  }

  crearUsuario(usuario:Usuario){
    return this.http.post<Usuario>(this.Url,usuario);
  }

  getUsuarioId(id:number){
    return this.http.get<Usuario>(this.Url+"/"+id);
  }

  updateUsuario(usuario:Usuario){
    return this.http.put<Usuario>(this.Url+"/"+usuario.id,usuario);
  }

  deleteUsuario(usuario:Usuario){
    return this.http.delete<Usuario>(this.Url+"/"+usuario.id);
  }


  uploadExcel(usuarios:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    let lista =  this.http.post(this.Url+"/upload",usuarios,httpOptions);
    return lista;
  }

  uploadEditExcel(usuarios:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    
    return this.http.post(this.Url+"/uploadEdit",usuarios,httpOptions);
  }

  login(user: any){
    return this.http.post(this.Url+"/login", user);
  }

}
