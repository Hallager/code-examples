import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
export type PredefinedColors =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'light'
  | 'medium'
  | 'dark';
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastController = inject(ToastController);
  private readonly translatePipe = inject(TranslatePipe);


  constructor() { }

  async presentToast(message: string, color: PredefinedColors) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }


  async presentToastSaveSuccess() {
    const toast = await this.toastController.create({
      message: this.tp('global.save_success'),
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    toast.present();
  }

 async presentServerError() {
    const toast = await this.toastController.create({
      message: this.tp('global.server_error'),
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    toast.present();
  }

  tp(key: string, ...args: any[]): string {
    return this.translatePipe.transform(key, ...args);
  }
}
