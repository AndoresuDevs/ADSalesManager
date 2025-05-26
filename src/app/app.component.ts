import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { FontService } from './core/services/font/font.service';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private fontService: FontService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.fontService.init();
    this.titleService.setTitle(environment.projectName);
  }
}
