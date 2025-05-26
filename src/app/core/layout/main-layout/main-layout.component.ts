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
        label:'Home',
        icon: 'pi pi-fw pi-home',
        command: () => {
          this.router.navigate(['/home']);
          this.toggleDrawer();
        }
      },
      {
        label: 'Files',
        icon: 'pi pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-plus',
            command: () => {
              this.toast.success('Navigating', 'Going to Users Management');
              this.router.navigate(['/management/users']);
              this.toggleDrawer();
            }
          },
          {
            label: 'Search',
            icon: 'pi pi-search',
            command: () => {
              this.toast.info('Navigating', 'Going to Roles Management');
              this.router.navigate(['/management/roles']);
              this.toggleDrawer();
            }
          },
          {
            label: 'Print',
            icon: 'pi pi-print',
            command: () => {
              this.toast.info('Navigating', 'Going to Categories Management');
              this.router.navigate(['/management/categories']);
              this.toggleDrawer();
            }
          }
        ]
      },
      {
        label: 'Sync',
        icon: 'pi pi-cloud',
        items: [
          {
            label: 'Import',
            icon: 'pi pi-cloud-download',
            command: () => {
              this.toast.info('Navigating', 'Going to Sales');
              this.router.navigate(['/sales']);
              this.toggleDrawer();
            }
          },
          {
            label: 'Export',
            icon: 'pi pi-cloud-upload',
            command: () => {
              this.toast.info('Navigating', 'Going to Inventory');
              this.router.navigate(['/inventory']);
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
