import { Usuario } from './Usuario.interface';

export interface RankingPontuacao {
    id?: number;
    pontuacao: number;
    nivel: number;
    usuarioId: number;
    usuario: Usuario[];  
};