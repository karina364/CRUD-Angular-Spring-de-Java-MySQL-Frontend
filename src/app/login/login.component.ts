import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string;
  contrasena: string;
  constructor(private service:ServiceService, private router:Router) { }

  ngOnInit(): void {
  }

  login():void{
    try {
      const user = {usuario: this.usuario, contrasena: this.contrasena};
      
      this.service.login(user).subscribe(data => {
        
        if(data=='1'){
          this.router.navigate(["listar"]);
        }else{
          alert('¡El usuario y/o contraseña no son válidos!.');
        }
      });
    } catch (err) {
      alert('¡El usuario y/o contraseña no son válidos!.');
    }
  }

}
