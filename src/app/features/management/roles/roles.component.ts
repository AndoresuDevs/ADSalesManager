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
import { SelectModule } from 'primeng/select';
import { ChipModule } from 'primeng/chip';
import { IsActivePipe } from '../../../shared/pipes/is-active.pipe';
import { ToastService } from '../../../core/services/toast/toast.service';
import { role } from '../../../core/models/user.interface';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-roles',
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
    SelectModule,
    ChipModule,
    CardModule,
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements OnInit {
  roles: role[] = [];
  selectedRole: role | undefined;
  statusOptions = [
      { name: 'Activo', value: "true" },
      { name: 'Inactivo', value: "false" }
  ];
  displayDialog = false;
  displayDeleteDialog = false;
  dialogMode: 'create' | 'edit' = 'create';
  selectedStatus: { name: string, value: boolean } | null = null;
  filterValue: string = '';
  
  newRole: role = {
    id: '',
    name: '',
    description: '',
    isActive: true,
    createdAt: new Date(),
  };

  constructor(private toast: ToastService) {}

  ngOnInit() {
    // TODO: Replace with actual API call
    this.roles = [
      { 
        id: '1', 
        name: 'Administrador', 
        description: 'Control total del sistema', 
        isActive: true,
        createdAt: new Date()
      },
      { 
        id: '2', 
        name: 'Vendedor', 
        description: 'Acceso a ventas e inventario',
        isActive: true,
        createdAt: new Date()
      },
      { 
        id: '3', 
        name: 'Supervisor', 
        description: 'Supervisión de operaciones', 
        isActive: false,
        createdAt: new Date()
      }
    ];
  }

  showCreateDialog() {
    this.dialogMode = 'create';
    this.newRole = {
      id: "",
      name: '',
      description: '',
      isActive: true,
      createdAt: new Date()
    };
    this.displayDialog = true;
  }

  showEditDialog(role: role) {
    this.dialogMode = 'edit';
    this.newRole = { ...role };
    this.displayDialog = true;
  }

  saveRole() {
    if (this.dialogMode === 'create') {
      this.roles = [...this.roles, { ...this.newRole }];
      this.toast.success('Éxito', 'Rol creado exitosamente');
    } else {
      const index = this.roles.findIndex(r => r.id === this.newRole.id);
      if (index !== -1) {
        this.roles[index] = { ...this.newRole };
        this.roles = [...this.roles];
        this.toast.success('Éxito', 'Rol actualizado exitosamente');
      }
    }
    this.displayDialog = false;
  }

  deleteRole(role: role) {
    this.selectedRole = role;
    this.displayDeleteDialog = true;
  }

  confirmDelete() {
    if (this.selectedRole) {
      this.roles = this.roles.filter(r => r.id !== this.selectedRole?.id);
      this.toast.warn('Eliminado', 'El rol ha sido eliminado');
      this.displayDeleteDialog = false;
      this.selectedRole = undefined;
    }
  }

  applyFilters() {
    let filtered = [...this.roles];
    
    // Apply text filter
    if (this.filterValue) {
      const searchStr = this.filterValue.toLowerCase();
      filtered = filtered.filter(role =>
        role.name.toLowerCase().includes(searchStr) ||
        (role.description?.toLowerCase() || '').includes(searchStr)
      );
    }
    
    // Apply status filter
    var statusValue:any = this.selectedStatus; 
    if (statusValue !== null) {
      statusValue === "true" ? true : false;
    }
    if (this.selectedStatus !== null) {
      filtered = filtered.filter(role => 
        role.isActive === (statusValue === "true" ? true : false)
      );
    }
    
    return filtered;
  }

  clearFilters() {
    this.selectedRole = undefined;
    this.filterValue = '';
    this.selectedStatus = null;
  }
}
