import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonTitle,
  IonToolbar,
  IonList,
  IonSelect,
  ModalController,
  IonSelectOption,
  IonLabel,
  IonDatetimeButton,
  IonDatetime,
  IonModal,
} from '@ionic/angular/standalone';
import { ExtraService } from '../../services/extra.service';
import { Extra } from '../../models/extra';

@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.scss'],
  standalone: true,
  imports: [
    IonList,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonDatetimeButton,
    IonDatetime,
    IonModal,
    FormsModule,
  ],
})
export class RentalFormComponent implements OnInit {
  formatOptions = {
    date: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
  };

  startDate = new Date().toISOString();
  endDate = new Date().toISOString();
  selectedExtras: Extra[] = [];

  extras$ = signal<Extra[]>([]);

  constructor(
    private extraService: ExtraService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.extraService.getAllExtras().subscribe(extras => {
      this.extras$.set(extras);
    });
  }

  cancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(): void {
    this.modalCtrl.dismiss(
      {
        startDate: this.startDate,
        endDate: this.endDate,
        extras: this.selectedExtras,
      },
      'confirm'
    );
  }

  handleChange(event: CustomEvent): void {
    this.selectedExtras = event.detail.value;
  }
}
