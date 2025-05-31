import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelMenu } from 'primeng/panelmenu';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme/theme.service';
import { ToastService } from '../../services/toast/toast.service';
import { CardModule } from 'primeng/card';
import { filter } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    ButtonModule,
    DrawerModule,
    AvatarModule,
    PanelMenu,
    BreadcrumbModule,
    RouterModule,
    CardModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  items: MenuItem[];
  drawerOpen = false;
  breadcrumbItems: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/home' };
  projectName = environment.projectName;

  constructor(
    private themeService: ThemeService, 
    private router: Router, 
    private toast: ToastService,
    private authService: AuthService,
  ) {
    this.items = [
      {
        label:'Inicio',
        icon: 'pi pi-fw pi-home',
        command: () => {
          this.router.navigate(['/home']);
          this.toggleDrawer();
        }
      },
      {
        label:'Punto de Venta',
        icon: 'pi pi-fw pi-shop',
        command: () => {
          this.router.navigate(['/pos']);
          this.toggleDrawer();
        }
      },
      {
        label:'Inventario',
        icon: 'pi pi-fw pi-list-check',
        command: () => {
          this.router.navigate(['/inventory']);
          this.toggleDrawer();
        }
      },
      {
        label: 'Promociones',
        icon: 'pi pi-ticket',
        command: () => {
          this.router.navigate(['/promotions']);
          this.toggleDrawer();
        }
      },
      {
        label: 'Administrar',
        icon: 'pi pi-folder',
        items: [
          {
            label: 'Categorias',
            icon: 'pi pi-tags',
            command: () => {
              this.router.navigate(['/management/categories']);
              this.toggleDrawer();
            }
          },
          {
            label: 'Usuarios',
            icon: 'pi pi-users',
            command: () => {
              this.router.navigate(['/management/users']);
              this.toggleDrawer();
            }
          },
          {
            label: 'Roles',
            icon: 'pi pi-sitemap',
            command: () => {
              this.router.navigate(['/management/roles']);
              this.toggleDrawer();
            }
          },
        ]
      },
      {
        label: 'Reportes',
        icon: 'pi pi-chart-line',
        items: [
          {
            label: 'Ventas',
            icon: 'pi pi-receipt',
            command: () => {
              this.router.navigate(['/sales']);
              this.toggleDrawer();
            }
          }
        ]
      },
      {
        label: 'Sign Out',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout();
          this.toast.warn('Signing out', 'Goodbye!');
          this.toggleDrawer();
          this.router.navigate(['/login']);
          // Add your sign out logic here
        }
      }
    ];

    // Subscribe to router events to update breadcrumb
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumb();
      });
  }

  ngOnInit() {
    this.themeService.init();
    this.updateBreadcrumb();
  }

  private updateBreadcrumb() {
    const urlSegments = this.router.url.split('/').filter(segment => segment);
    this.breadcrumbItems = [];
    
    let path = '';
    for (const segment of urlSegments) {
      path += `/${segment}`;
      this.breadcrumbItems.push({
        label: this.formatBreadcrumbLabel(segment),
        routerLink: path
      });
    }
  }

  private formatBreadcrumbLabel(segment: string): string {
    return segment
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  toggleAll() {
    const expanded = !this.areAllItemsExpanded();
    this.items = this.toggleAllRecursive(this.items, expanded);
  }

  private toggleAllRecursive(items: MenuItem[], expanded: boolean): MenuItem[] {
      return items.map((menuItem) => {
          menuItem.expanded = expanded;
          if (menuItem.items) {
              menuItem.items = this.toggleAllRecursive(menuItem.items, expanded);
          }
          return menuItem;
      });
  }

  private areAllItemsExpanded(): boolean {
      return this.items.every((menuItem) => menuItem.expanded);
  }
}
