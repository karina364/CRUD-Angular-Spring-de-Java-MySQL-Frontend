import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ServiceService} from './Service/service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pruebaFront';

  ngOnInit(): void {
    this.router.navigate(["login"]);
  }
  
  constructor(private service:ServiceService, private router:Router){}
}
