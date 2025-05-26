export interface Sale {
  id: string;
  date: Date;
  client?: string;
  total: number;
  items: ItemSale[];
  userId: string;
}

export interface ItemSale {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}