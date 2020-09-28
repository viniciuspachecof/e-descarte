import { Item } from './Item.interface';
import { PontoDescarte } from './pontodescarte.interface';
import { Usuario } from './Usuario.interface';

export interface PontoDescarteItem {    
    id?: number;
    quant: number;
    pontodescarteId: number;
    pontoDescarte: PontoDescarte
    itemId: number;
    item: Item;
    usuarioId: number;
    usuario: Usuario;
};