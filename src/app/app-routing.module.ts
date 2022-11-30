import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './Usuario/add/add.component';
import { EditarComponent } from './Usuario/editar/editar.component';
import { ListarComponent } from './Usuario/listar/listar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent} from './app.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'listar', component:ListarComponent},
  {path:'add', component:AddComponent},
  {path:'editar', component:EditarComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
