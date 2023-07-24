export interface User {
    name: string;
    email: string;
    
}

export enum Role {
    admin = "admin",
    user = "user"
}

export interface Habitacion {
    descripcion : string;
    precio : number;
}

