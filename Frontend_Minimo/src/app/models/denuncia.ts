//Interfaz de 'Valoracion'
export interface Denuncia {
    _id: string,
    userId: string;
    gravity: number;
    date: Date;
    productId: string;
    description: string;
}