import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { IsActivePipe } from '../../../shared/pipes/is-active.pipe';
import { ToastService } from '../../../core/services/toast/toast.service';
import { User, role } from '../../../core/models/user.interface';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TooltipModule,
    CheckboxModule,
    IconFieldModule,
    InputIconModule,
    IsActivePipe,
    MultiSelectModule,
    DropdownModule,
    CardModule,
    CalendarModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | undefined;
  availableRoles: role[] = [
    { id: '1', name: 'Administrador', description: 'Control total del sistema', isActive: true, createdAt: new Date() },
    { id: '2', name: 'Vendedor', description: 'Acceso a ventas e inventario', isActive: true, createdAt: new Date() },
    { id: '3', name: 'Supervisor', description: 'Supervisión de operaciones', isActive: true, createdAt: new Date() }
  ];
  statusOptions = [
    { name: 'Activo', value: "true" },
    { name: 'Inactivo', value: "false" }
  ];
  displayDialog = false;
  displayDeleteDialog = false;
  dialogMode: 'create' | 'edit' = 'create';
  selectedStatus: { name: string, value: boolean } | null = null;
  filterValue: string = '';
  
  newUser: User = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    phone: '',
    roles: [],
    isActive: true,
    startDate: new Date()
  };

  constructor(private toast: ToastService) {}

  ngOnInit() {
    // TODO: Replace with actual API call
    this.users = [
      { 
        id: '1',
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@example.com',
        phone: '123-456-7890',
        roles: ['1', '2'],
        isActive: true,
        startDate: new Date()
      },
      { 
        id: '2',
        name: 'María',
        lastName: 'López',
        email: 'maria.lopez@example.com',
        phone: '098-765-4321',
        roles: ['2'],
        isActive: true,
        startDate: new Date()
      }
    ];
  }

  showCreateDialog() {
    this.dialogMode = 'create';
    this.newUser = {
      id: Date.now().toString(),
      name: '',
      lastName: '',
      email: '',
      phone: '',
      roles: [],
      isActive: true,
      startDate: new Date()
    };
    this.displayDialog = true;
  }

  showEditDialog(user: User) {
    this.dialogMode = 'edit';
    this.newUser = { ...user };
    this.displayDialog = true;
  }

  saveUser() {
    if (this.dialogMode === 'create') {
      this.users = [...this.users, { ...this.newUser }];
      this.toast.success('Éxito', 'Usuario creado exitosamente');
    } else {
      const index = this.users.findIndex(u => u.id === this.newUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.newUser };
        this.users = [...this.users];
        this.toast.success('Éxito', 'Usuario actualizado exitosamente');
      }
    }
    this.displayDialog = false;
  }

  deleteUser(user: User) {
    this.selectedUser = user;
    this.displayDeleteDialog = true;
  }

  confirmDelete() {
    if (this.selectedUser) {
      this.users = this.users.filter(u => u.id !== this.selectedUser?.id);
      this.toast.warn('Eliminado', 'El usuario ha sido eliminado');
      this.displayDeleteDialog = false;
      this.selectedUser = undefined;
    }
  }

  applyFilters() {
    let filtered = [...this.users];
    
    // Apply text filter
    if (this.filterValue) {
      const searchStr = this.filterValue.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchStr) ||
        user.lastName.toLowerCase().includes(searchStr) ||
        user.email?.toLowerCase().includes(searchStr) ||
        user.phone?.toLowerCase().includes(searchStr)
      );
    }
    
    // Apply status filter
    var statusValue:any = this.selectedStatus; 
    if (statusValue !== null) {
      statusValue === "true" ? true : false;
    }
    if (this.selectedStatus !== null) {
      filtered = filtered.filter(user => 
        user.isActive === (statusValue === "true" ? true : false)
      );
    }
    
    return filtered;
  }

  clearFilters() {
    this.selectedUser = undefined;
    this.filterValue = '';
    this.selectedStatus = null;
  }

  getRolesForUser(roleIds: string[]): string {
    return roleIds.map(id => {
      const role = this.availableRoles.find(r => r.id === id);
      return role ? role.name : '';
    }).join(', ');
  }
}
