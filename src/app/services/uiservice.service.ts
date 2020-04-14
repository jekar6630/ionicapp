import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UIServiceService {

  constructor( private alertController: AlertController,
               private toastController: ToastController ) { }

  async alertaInformativa( message: string ) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast( message ) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

}
