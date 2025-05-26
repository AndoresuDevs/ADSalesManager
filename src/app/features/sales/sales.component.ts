import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputOtpModule } from 'primeng/inputotp';
import { ColorPickerModule } from 'primeng/colorpicker';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePickerModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    InputOtpModule,
    ColorPickerModule,
    IconFieldModule,
    InputIconModule,
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
