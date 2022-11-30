import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/Usuario';
import { ServiceService } from 'src/app/Service/service.service';
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})

export class EditarComponent implements OnInit {
  
  usuario = new Usuario();
  constructor(private router:Router, private service:ServiceService) { }
  
  ngOnInit(): void {
    this.editar();
  }

  editar(): void{
    let id = localStorage.getItem("id");
    
    this.service.getUsuarioId(+id!)
    .subscribe(data=>{
      this.usuario=data;
    })
  }

  
  actualizar(usuario:Usuario){
    this.service.updateUsuario(usuario)
    .subscribe(data=>{
      this.usuario=data;
      alert('se actualizo!!');
      this.router.navigate(["listar"]);
    })
  }

}
