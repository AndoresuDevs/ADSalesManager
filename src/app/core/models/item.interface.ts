export interface Item {
    id: string;
    name: string;
    descripcion?: string;
    price: number;
    stock: number;
    categoryId: string;
    categoryName?: string;
    providerId?: string;
    providerName?: string;
    activo: boolean;
    imageUrl?: string;
    createDate: Date;
    updateDate?: Date;
    updatedBy?: string;
}