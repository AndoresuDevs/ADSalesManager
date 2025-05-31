export interface User {
    id: string;
    name: string;
    lastName: string;
    email?: string;
    phone?: string;
    roles: string[];
    isActive: boolean;
    startDate: Date;
    // salary?: number;
    // schedule?: string;
}

export interface role {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt?: Date;
}