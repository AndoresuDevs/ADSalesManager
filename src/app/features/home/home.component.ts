import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DevelopementComponent } from "../../core/layout/developement/developement.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardModule, ButtonModule, DevelopementComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
