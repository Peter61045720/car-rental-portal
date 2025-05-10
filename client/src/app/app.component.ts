import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  addSharp,
  alertCircle,
  alertCircleOutline,
  calendarOutline,
  calendarSharp,
  carOutline,
  carSharp,
  checkmarkCircleOutline,
  checkmarkCircleSharp,
  closeCircleOutline,
  closeCircleSharp,
  createOutline,
  createSharp,
  cubeOutline,
  cubeSharp,
  hourglassOutline,
  logOutOutline,
  logOutSharp,
  settingsOutline,
  settingsSharp,
  trashOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      carOutline,
      carSharp,
      settingsOutline,
      settingsSharp,
      logOutOutline,
      logOutSharp,
      addOutline,
      addSharp,
      cubeOutline,
      cubeSharp,
      calendarOutline,
      calendarSharp,
      hourglassOutline,
      alertCircleOutline,
      alertCircle,
      createOutline,
      createSharp,
      checkmarkCircleOutline,
      checkmarkCircleSharp,
      closeCircleOutline,
      closeCircleSharp,
      trashOutline,
    });
  }
}
