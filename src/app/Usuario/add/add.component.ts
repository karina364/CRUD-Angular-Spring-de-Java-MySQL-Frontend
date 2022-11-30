import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/Usuario';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  usuario = new Usuario();
  constructor(private router:Router, private service:ServiceService) { }

  ngOnInit(): void {
  }

  guardar(usuario:Usuario){
    this.service.crearUsuario(usuario)
    .subscribe(data=>{
      alert('Se agrego con exito!!');
      this.router.navigate(["listar"]);
    })
  }

}
