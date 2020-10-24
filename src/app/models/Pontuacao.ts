import { Usuario } from './Usuario.interface';

export interface Pontuacao {
    id?: number;
    totalponto: number;
    usuarioId: number;   
    usuario: Usuario[];
};