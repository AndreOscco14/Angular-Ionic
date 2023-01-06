import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item.model';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista:Lista | undefined;
  nombreItem: ' ' = " ";
  
  constructor(
    private deseosService: DeseosService,
    private router: ActivatedRoute
  ) {

  const listaId = this.router.snapshot.paramMap.get('listaId');
    console.log(listaId);

  this.lista = this.deseosService.obtenerLista(listaId || '{}');
  console.log(this.lista);

}




  ngOnInit() {
  }

  agregarItem(){
      if(this.nombreItem.length === 0 ) {
        return;
      }
      const nuevoItem = new ListaItem(this.nombreItem);
      this.lista?.items.push(nuevoItem);

      this.nombreItem = ' ' ;
      this.deseosService.guardarStorage();
  }


   cambioCheck(item: ListaItem) {
      console.log(item);

      // Saber si la lista está terminada o no
      const pendientes = this.lista?.items.filter( itemData => {
        return !itemData.completado;
      }).length;

      // if( pendientes === 0) {
      //     this.lista?.terminadaEn = new Date('' | undefined) ;
      //     this.lista?.terminada = true; 
      // } else {
      //   this.lista?.terminadaEn=null;
      //   this.lista?.terminada= false;
      // }
      // console.log({ pendientes });
      this.deseosService.guardarStorage();
   }

   borrar(i:number){
      this.lista?.items.splice( i, 1);
      this.deseosService.guardarStorage();
   }

}
