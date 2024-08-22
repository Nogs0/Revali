import moment from "moment"

export interface ProdutosResgate {
    nome: string,
    descricao: string,
    quantidade: number,
    valor: number,
    marca: string,
    fornecedor: string,
    pastaDeFotos: string,
    id: number
}

export interface ProdutosCompra {
    id: number,
    quantidade: number
}

export interface CreateResgate {
    data: moment.Moment,
    doador_id: number,
    itens: ProdutosCompra[]
}

export interface Movimentacoes {
    id: number,
    data: moment.Moment,
    pontos: number,
    isEntrada: boolean,
    origem: string,
}

export interface ExtratoDto {
    saldo_atual: number,
    movimentacoes: Movimentacoes[]
}

export interface Doacao {
    id: number,
    data: moment.Moment,
    doador_id: number,
    pontos_gerados: number,
    status: number,
    banco_de_alimento_id: number
}