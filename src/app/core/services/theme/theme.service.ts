import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storageKey = 'preferred-theme';
  private theme$ = new BehaviorSubject<ThemeMode>('light');

  get currentTheme$() {
    return this.theme$.asObservable();
  }

  get currentTheme(): ThemeMode {
    return this.theme$.value;
  }

  init() {
    const saved = localStorage.getItem(this.storageKey) as ThemeMode | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'dark' || (!saved && prefersDark)) {
      this.setDarkMode(false, false); // Dark mode disabled by default
    } else {
      this.setDarkMode(false, false);
    }
  }

  toggleDarkMode() {
    const isDark = this.theme$.value === 'dark';
    this.setDarkMode(!isDark);
  }

  private setDarkMode(enable: boolean, animate = true) {
    const root = document.documentElement;

    if (animate) {
      root.classList.add('transition-theme');
      setTimeout(() => root.classList.remove('transition-theme'), 300);
    }

    if (enable) {
      root.classList.add('dark-mode');
      localStorage.setItem(this.storageKey, 'light');// set dark when re-enabled darkmode
      this.theme$.next('dark');
    } else {
      root.classList.remove('dark-mode');
      localStorage.setItem(this.storageKey, 'light');
      this.theme$.next('light');
    }
  }
}
