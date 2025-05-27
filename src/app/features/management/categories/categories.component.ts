import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { Category } from '../../../core/models/category.interface';
import { ToastService } from '../../../core/services/toast/toast.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { IsActivePipe } from '../../../shared/pipes/is-active.pipe';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-categories',
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
    SelectModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {  categories: Category[] = [];
  selectedCategory: Category | undefined;
  statusOptions = [
      { name: 'Activa', value: "true" },
      { name: 'Inactiva', value: "false" }
  ];
  displayDialog = false;
  dialogMode: 'create' | 'edit' = 'create';
  selectedStatus: { name: string, value: boolean } | null = null;
  filterValue: string = '';
  
  newCategory: Category = {
    id: '',
    name: '',
    description: '',
    IsActive: true
  };

  constructor(private toast: ToastService) {}

  ngOnInit() {
    // TODO: Replace with actual API call
    this.categories = [
      { id: '1', name: 'Electronicos', description: 'Dispositivos Electronicos', IsActive: true },
      { id: '2', name: 'Ropa', description: 'Ropa', IsActive: true },
      { id: '3', name: 'Jueguetes', description: 'Libros y Revistas', IsActive: false }
    ];
  }

  showCreateDialog() {
    this.dialogMode = 'create';
    this.newCategory = {
      id: Date.now().toString(), // Temporary ID generation
      name: '',
      description: '',
      IsActive: true
    };
    this.displayDialog = true;
  }

  showEditDialog(category: Category) {
    this.dialogMode = 'edit';
    this.newCategory = { ...category };
    this.displayDialog = true;
  }

  saveCategory() {
    if (this.dialogMode === 'create') {
      this.categories = [...this.categories, { ...this.newCategory }];
      this.toast.success('Success', 'Category created successfully');
    } else {
      const index = this.categories.findIndex(c => c.id === this.newCategory.id);
      if (index !== -1) {
        this.categories[index] = { ...this.newCategory };
        this.categories = [...this.categories];
        this.toast.success('Success', 'Category updated successfully');
      }
    }
    this.displayDialog = false;
  }

  deleteCategory(category: Category) {
    this.categories = this.categories.filter(c => c.id !== category.id);
    this.toast.warn('Deleted', 'Category has been removed');
  }

  applyFilters() {
    let filtered = [...this.categories];
    
    // Apply text filter
    if (this.filterValue) {
      const searchStr = this.filterValue.toLowerCase();
      filtered = filtered.filter(category =>
        category.name.toLowerCase().includes(searchStr) ||
        (category.description?.toLowerCase() || '').includes(searchStr)
      );
    }
    
    // Apply status filter
    var statusValue:any = this.selectedStatus; 
    if (statusValue !== null) {
      statusValue === "true" ? true : false;
    }
    if (this.selectedStatus !== null) {
      filtered = filtered.filter(category => 
        category.IsActive === (statusValue === "true" ? true : false)
      );
    }
    
    return filtered;
  }

  clearFilters() {
    this.selectedCategory = undefined;
    this.newCategory = {
      id: '',
      name: '',
      description: '',
      IsActive: true
    };
  }
}
