import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList)  lista: IonList | undefined;
  @Input() terminada = true;
    // lista: Lista | undefined;

  constructor(
    public deseosService: DeseosService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {}


  listaSeleccionada(lista: Lista){
    console.log(lista);

    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id}`);
    }else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id}`);
    }
  }

  BorrarEstaLista(lista: Lista) {
    this.deseosService.borrarLista( lista);
  }

  async editarLista(lista: Lista){
    const alert = await this.alertCtrl.create({
      header: 'Nueva Lista',
      inputs: [
          {
            name: 'titulo',
            type: 'text',
            value: lista.titulo,
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
            this.lista?.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            console.log(data);
            if(data.titulo.lenght === 0){
              return;
            }

            lista.titulo = data.titulo
            this.deseosService.guardarStorage();
            this.lista?.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();
  }

}
