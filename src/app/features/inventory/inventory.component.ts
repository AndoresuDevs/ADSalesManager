import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastService } from '../../core/services/toast/toast.service';
import { Item } from '../../core/models/item.interface';
import { Category } from '../../core/models/category.interface';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    CheckboxModule,
    IconFieldModule,
    InputIconModule,
    InputNumberModule,
    CardModule,
    ImageModule,
    SelectButtonModule,
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  items: Item[] = [];
  selectedItem: Item | undefined;
  categories: Category[] = [
    { id: '1', name: 'Electrónicos', description: 'Dispositivos Electrónicos', IsActive: true },
    { id: '2', name: 'Ropa', description: 'Ropa y Accesorios', IsActive: true },
    { id: '3', name: 'Juguetes', description: 'Juguetes y Juegos', IsActive: true }
  ];
  statusOptions = [
    { name: 'Activo', value: "true" },
    { name: 'Inactivo', value: "false" }
  ];
  viewOptions = [
    { icon: 'pi pi-list', label: "Lista", value: 'list' },
    { icon: 'pi pi-th-large', label: "Cuadri", value: 'grid' }
  ];
  displayDialog = false;
  displayDeleteDialog = false;
  dialogMode: 'create' | 'edit' = 'create';
  selectedStatus: { name: string, value: boolean } | null = null;
  selectedCategory: string | null = null;
  filterValue: string = '';
  currentView: 'list' | 'grid' = 'list';
  
  newItem: Item = {
    id: '',
    name: '',
    descripcion: '',
    price: 0,
    stock: 0,
    categoryId: '',
    activo: true,
    createDate: new Date()
  };

  constructor(private toast: ToastService) {}

  ngOnInit() {
    // TODO: Replace with actual API call
    this.items = [
      {
        id: '1',
        name: 'Laptop HP',
        descripcion: 'Laptop HP 15.6" Core i5',
        price: 899.99,
        stock: 10,
        categoryId: '1',
        categoryName: 'Electrónicos',
        activo: true,
        imageUrl: 'img/icon.png',
        createDate: new Date()
      },
      {
        id: '2',
        name: 'Camiseta Polo',
        descripcion: 'Camiseta Polo Algodón',
        price: 29.99,
        stock: 50,
        categoryId: '2',
        categoryName: 'Ropa',
        activo: true,
        imageUrl: 'img/icon.png',
        createDate: new Date()
      }
    ];
  }

  showCreateDialog() {
    this.dialogMode = 'create';
    this.newItem = {
      id: Date.now().toString(),
      name: '',
      descripcion: '',
      price: 0,
      stock: 0,
      categoryId: '',
      activo: true,
      createDate: new Date()
    };
    this.displayDialog = true;
  }

  showEditDialog(item: Item) {
    this.dialogMode = 'edit';
    this.newItem = { ...item };
    this.displayDialog = true;
  }

  saveItem() {
    if (this.dialogMode === 'create') {
      this.items = [...this.items, { ...this.newItem }];
      this.toast.success('Éxito', 'Producto creado exitosamente');
    } else {
      const index = this.items.findIndex(i => i.id === this.newItem.id);
      if (index !== -1) {
        this.items[index] = { ...this.newItem };
        this.items = [...this.items];
        this.toast.success('Éxito', 'Producto actualizado exitosamente');
      }
    }
    this.displayDialog = false;
  }

  deleteItem(item: Item) {
    this.selectedItem = item;
    this.displayDeleteDialog = true;
  }

  confirmDelete() {
    if (this.selectedItem) {
      this.items = this.items.filter(i => i.id !== this.selectedItem?.id);
      this.toast.warn('Eliminado', 'El producto ha sido eliminado');
      this.displayDeleteDialog = false;
      this.selectedItem = undefined;
    }
  }

  applyFilters() {
    let filtered = [...this.items];
    
    // Apply text filter
    if (this.filterValue) {
      const searchStr = this.filterValue.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchStr) ||
        item.descripcion?.toLowerCase().includes(searchStr)
      );
    }
    
    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(item => item.categoryId === this.selectedCategory);
    }
    
    // Apply status filter
    var statusValue:any = this.selectedStatus; 
    if (statusValue !== null) {
      statusValue === "true" ? true : false;
    }
    if (this.selectedStatus !== null) {
      filtered = filtered.filter(item => 
        item.activo === (statusValue === "true" ? true : false)
      );
    }
    
    return filtered;
  }

  clearFilters() {
    this.selectedItem = undefined;
    this.filterValue = '';
    this.selectedStatus = null;
    this.selectedCategory = null;
  }

  onUpload(event: any) {
    // TODO: Implement file upload
    const file = event.files[0];
    if (file) {
      // Here you would typically upload the file to your server
      // and get back a URL to store in newItem.imageUrl
      this.toast.success('Éxito', 'Imagen cargada exitosamente');
    }
  }

  toggleView(view: 'list' | 'grid') {
    this.currentView = view;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value);
  }
}
