import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
// Injeccion
  constructor(
    public deseosservice: DeseosService,
    private router: Router,
    private alertCtrl : AlertController
  ) {



  }

  async agregarLista(){
    // this.router.navigateByUrl('/tabs/tab1/agregar');
    const alert = await this.alertCtrl.create({
      header: 'Nueva Lista',
      inputs: [
          {
            name: 'titulo',
            type: 'text',
            placeholder: 'Nombre de la lista'
          }
      ],
      subHeader: 'Subtitle',
      message: 'This is an alert message',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            console.log(data);
            if(data.titulo.lenght === 0){
              return;
            }

           const listaId =  this.deseosservice.crearLista(data.titulo);
            //Crear lista

            //Redirigir a la pagina Agregar
            this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
          }
        }
      ]
    });
    alert.present();
  }

// listaSeleccionada(lista: Lista){
//   console.log(lista);
//   this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id}`);
// }

}
