import { Usuario } from './Usuario.interface';

export interface PontoDescarte {
    id?: number;
    nome: string;
    fone: string;
    longitude: number; 
    latitude: number;
    // usuario: Usuario[];
};