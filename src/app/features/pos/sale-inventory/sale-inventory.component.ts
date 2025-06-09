import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-sale-inventory',
  imports: [
    DataView,
    Tag,
    Rating,
    ButtonModule,
    CommonModule,
    SelectButton,
    FormsModule,
    ScrollPanelModule,
  ],
  templateUrl: './sale-inventory.component.html',
  styleUrl: './sale-inventory.component.scss'
})
export class SaleInventoryComponent {
  layout: 'grid'|'list' = 'grid';

  products = signal<any>([]);

  options = ['list', 'grid'];

  items:any=[]

  constructor() {}

  ngOnInit() {
      
      this.products.set([
        {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        id: '1001',
        code: 'nvklal433',
        name: 'Black Watch',
        description: 'Product Description',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Accessories',
        quantity: 61,
        inventoryStatus: 'INSTOCK',
        rating: 4
      },
      {
        id: '1002',
        code: 'zz21cz1c1',
        name: 'Blue Band',
        description: 'Product Description',
        image: 'blue-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 3
      },
      {
        id: '1003',
        code: 'xcz21cz21',
        name: 'Blue T-Shirt',
        description: 'Product Description',
        image: 'blue-t-shirt.jpg',
        price: 29,
        category: 'Clothing',
        quantity: 25,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        id: '1004',
        code: 'vxcvxcvxcv',
        name: 'Bracelet',
        description: 'Product Description',
        image: 'bracelet.jpg',
        price: 15,
        category: 'Accessories',
        quantity: 73,
        inventoryStatus: 'INSTOCK',
        rating: 4
      },
      {
          id:'1005', 
          code:'1234567890', 
          name:'Sample Product', 
          description:'This is a sample product.', 
          image: 'bamboo-watch.jpg',
          price:'19.99', 
          category:'Sample Category', 
          quantity:'100', 
          inventoryStatus:'INSTOCK', 
          rating:'4'

      }
    ]);
      
  }

}

