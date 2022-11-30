import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Usuario } from 'src/app/modelo/Usuario';
import {ServiceService} from '../../Service/service.service';
import * as XLSX from 'xlsx';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  ExcelData:any;
  lista:any;
  usuarios:Usuario[];
  usuario = new Usuario();
  file: File;
  constructor(private service:ServiceService, private router:Router) { }
  
  ngOnInit(): void {
    this.service.getUsuarios()
    .subscribe(data=>{
      
      alert('El formarto para subir nuevos usuarios es el mismo que se obtiene del informe de usuarios, asegurese de dejar el campo de id en blanco si es un nuevo registro; en caso de editar un registro conserve el id correspondiente!!!');
       this.usuarios=data;
       this.lista = data;
    })
  }

  agregar(){
    this.router.navigate(["add"]);
  }

  editar(usuario:Usuario):void{
    localStorage.setItem("id",usuario.id.toString());
    this.router.navigate(["editar"]);
  }

  delete(usuario:Usuario):void{
    this.service.deleteUsuario(usuario)
    .subscribe(data=>{
      this.usuarios = this.usuarios.filter(u=>u!=usuario);
      alert('Se ha eliminado el usuario con éxito!!.');
    });
  }

  onFilechange(event: any) {
      this.file = event.target.files[0]
  }

  upload(){
    
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(this.file);

    fileReader.onload = (e)=>{

      var workBook = XLSX.read(fileReader.result,{type:'binary'});
      var sheetNames = workBook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
      
      this.service.uploadExcel(this.ExcelData)
      .subscribe(data=>{
        console.log(data)
      alert('Se agrego con exito!!');
      this.router.navigate(["listar"]);
    }, err => {
      // Entra aquí si el servicio entrega un código http de error EJ: 404, 
      500
      alert('El formato que desea agregar no es válido (o tiene campos sin llenar), revise por favor los campos. Un formato válido es el que se descarga con la información de los usuarios!.');
      });
    }
    
  }

  downloadExcel(){
    
    this.service.getUsuarios()
    .subscribe(data=>{
       this.lista = data;
       var array:any=[];
       var newArrayExcel:any=[];
       for(let i=0; i<this.lista.length; i++){
        var event;
        for(event in this.lista[i]){
          newArrayExcel.push(event);
          
        }
        break;
       }
       
       array.push(newArrayExcel);
       for(let i=0; i<this.lista.length; i++){
        array.push(Object.values(this.lista[i])); 
       }
       console.log(array);
       var CsvString = "";
       array.forEach((RowItem:any, RowIndex:any)=>{
          RowItem.forEach((colItem:any, colIndex:any)=>{
            CsvString += colItem + ',';
          });
          CsvString += "\r\n";
       });
       CsvString = "data:application/csv," + encodeURIComponent(CsvString);
       var x = document.createElement("A");
       x.setAttribute("href",CsvString);
       x.setAttribute("download","somedata.csv");
       document.body.appendChild(x);
       x.click();
       this.lista =[];
    })

  }

  uploadEditExcel(){
    // let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(this.file);

    fileReader.onload = (e)=>{

      var workBook = XLSX.read(fileReader.result,{type:'binary'});
      var sheetNames = workBook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
      
      this.service.uploadEditExcel(this.ExcelData)
      .subscribe(data=>{
      alert('Se agrego con exito!!');
      this.router.navigate(["listar"]);
    })
    }
  }

}
