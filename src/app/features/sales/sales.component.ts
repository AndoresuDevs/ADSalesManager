import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopementComponent } from '../../core/layout/developement/developement.component';



@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CommonModule,
    DevelopementComponent
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent {
  nombre = '';
  fechaNacimiento!: Date;
  genero!: string;
  descripcion = '';
  activo = false;
  codigo = '';
  color = '#ff0000';

  generos = ['Masculino', 'Femenino', 'Otro'];
}
