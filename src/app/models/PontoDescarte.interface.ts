import { Cidade } from './cidade.interface';
import { Usuario } from './Usuario.interface';

export interface PontoDescarte {
    id?: number;
    nome: string;
    fone: string;
    longitude: number; 
    latitude: number;
    usuarioId: number;
    usuario: Usuario[];
    cidadeId: number;
    cidade: Cidade;
};