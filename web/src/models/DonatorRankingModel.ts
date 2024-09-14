interface Doador {
    id: number;
    user_id: number;
    pontos: number;
    nome: string;
}

export interface DonorData {
    doador: Doador;
    pontos_gerados: number;
    ranking: number;
}