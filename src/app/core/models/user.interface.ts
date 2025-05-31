export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string[];
    isActive: boolean;
    startDate: Date;
}

export interface role {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt?: Date;
}