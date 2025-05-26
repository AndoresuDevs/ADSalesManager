import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, RouterModule, PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  identifier: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router:Router) {}

  login() {
    // TODO: Implementar login con email o celular
    console.log('Login with', this.identifier, this.password);
    // Activar permisos con aut guard
    this.authService.login(this.identifier);
    // Redirigir a la página de inicio
    this.router.navigate(['/home']);
  }
}
