import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FontService {
  init() {
    this.applyFontStyles();
  }

  private applyFontStyles() {
    const root = document.documentElement;
    const { font } = environment.theme;

    // Set font family
    root.style.setProperty('--font-family', font.family);

    // Set font sizes
    Object.entries(font.size).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value);
    });
  }
}
