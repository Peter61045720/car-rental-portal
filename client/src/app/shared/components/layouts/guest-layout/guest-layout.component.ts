import { Component } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-guest-layout',
  templateUrl: './guest-layout.component.html',
  styleUrls: ['./guest-layout.component.scss'],
  standalone: true,
  imports: [IonRouterOutlet],
})
export class GuestLayoutComponent {}
