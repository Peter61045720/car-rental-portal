import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  ToastOptions,
} from '@ionic/angular/standalone';
import { NavItem } from 'src/app/shared/models/nav-item';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
  ],
})
export class AdminLayoutComponent implements OnInit {
  appPages: NavItem[];
  readonly user = signal<User | null>(null);

  loadingToastOptions: ToastOptions = {
    message: 'Logging out...',
    position: 'top',
    icon: 'hourglass-outline',
  };

  successToastOptions: ToastOptions = {
    message: 'Logged out successfully!',
    duration: 2000,
    icon: 'checkmark-circle-outline',
    position: 'top',
    color: 'success',
  };

  constructor(
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService
  ) {
    this.appPages = [
      {
        icon: 'car',
        title: 'Browse Cars',
        url: '/admin/cars',
      },
      {
        icon: 'calendar',
        title: 'Browse Rentals',
        url: '/admin/rentals',
      },
      {
        icon: 'add',
        title: 'Add New Car',
        url: '/admin/add-car',
      },
      {
        icon: 'cube',
        title: 'Add New Extra',
        url: '/admin/add-extra',
      },
    ];
  }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe(data => {
      if (data.user) {
        this.user.set(data.user);
      }
    });
  }

  viewProfile(): void {
    this.router.navigateByUrl('/app/profile');
  }

  logout(): void {
    this.toastService.presentClosableToast(this.loadingToastOptions);
    this.authService.logout().subscribe(() => {
      this.toastService.close();
      this.toastService.presentToast(this.successToastOptions);
    });
    this.router.navigateByUrl('/login');
  }
}
