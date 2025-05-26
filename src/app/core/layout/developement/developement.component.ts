import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-developement',
  standalone: true,
  imports: [CommonModule, CardModule, ProgressSpinnerModule],
  templateUrl: './developement.component.html',
  styleUrl: './developement.component.scss'
})
export class DevelopementComponent {
  @Input() title: string = 'Desarrollo en Progreso';
}
