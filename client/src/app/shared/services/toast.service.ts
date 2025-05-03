import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toast: HTMLIonToastElement | null = null;

  constructor(private toastController: ToastController) {}

  async presentToast(options: ToastOptions): Promise<void> {
    const toast = await this.toastController.create({
      header: options.header,
      message: options.message,
      duration: options.duration,
      position: options.position,
      icon: options.icon,
      color: options.color,
    });

    await toast.present();
  }

  async presentClosableToast(options: ToastOptions): Promise<void> {
    this.toast = await this.toastController.create({
      header: options.header,
      message: options.message,
      duration: options.duration,
      position: options.position,
      icon: options.icon,
      color: options.color,
    });

    await this.toast.present();
  }

  close(): void {
    this.toast?.dismiss();
  }
}
