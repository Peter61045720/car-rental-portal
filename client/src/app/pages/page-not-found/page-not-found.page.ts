import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.page.html',
  styleUrls: ['./page-not-found.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, CommonModule, FormsModule],
})
export class PageNotFoundPage {}
