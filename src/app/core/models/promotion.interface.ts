export interface Promotion {
  id: string;
  name: string;
  type: 'percentage' | 'fixed' | 'quantity' | 'bundle';
  value: number; // can represent % or fixed discount depending on the type
  applicableProducts?: string[]; // Product IDs
  applicableCategories?: string[]; // Category IDs
  minimumQuantity?: number;
  isActive: boolean;
  startDate: Date;
  endDate?: Date;
}