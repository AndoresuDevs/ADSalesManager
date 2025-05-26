import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastService } from '../../../core/services/toast/toast.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, InputTextModule, PasswordModule, ButtonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  identifier: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private toastService:ToastService, private router:Router) {}

  register() {
    // TODO: Validar que el password coincida
    console.log('Register with', this.identifier, this.password);
    this.toastService.success('Registro exitoso', 'El registro se ha completado con éxito.');
    // Redirigir a la página de inicio
    this.router.navigate(['/home']);
  }
}
