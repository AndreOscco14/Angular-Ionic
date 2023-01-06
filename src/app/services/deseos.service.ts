import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() { 

    this.cargarStorage();
    // console.log('Servicio Inicializado');
    // console.log(this.listas);
    
   }

   crearLista( titulo: string){
      const nuevaLista = new Lista(titulo);
      this.listas.push(nuevaLista)

      //Guarda los datos en el localStorage
      this.guardarStorage();

      //Guarda todos los datos Incluido el ID
      console.log(nuevaLista);

      //Recoge el ID para que redirija a la pagina de agregar
      return nuevaLista.id;
   }

   borrarLista(lista: Lista){
   this.listas =  this.listas.filter( listaData => {
      return listaData.id !== lista.id
    });
    this.guardarStorage();
   }


   obtenerLista( id: string | number ){
        id = Number(id);
       return this.listas.find( listaData => {
          return listaData.id == id;
        });
   }

   guardarStorage(){
    // Convierte el this.listas en un String
    localStorage.setItem('data', JSON.stringify(this.listas));
   }

   cargarStorage(){
    if(localStorage.getItem('data') ) {
      this.listas= JSON.parse( localStorage.getItem('data') || '{}');
    } else {
      this.listas=[];
    }

   }

}
