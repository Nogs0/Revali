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
    data: string,
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

export interface MovimentacaoDetalhada {
    movimentacao: Movimentacoes,
    tipo: string,
    produtos: ItemMovimentacao[]
}

export interface ItemMovimentacao {
    nome: string,
    quantidade: number,
    valor_item: number,
    pastaDeFotos: string
}

export interface ExtratoDto {
    saldo_atual: number,
    movimentacoes: Movimentacoes[]
}

export interface DoacaoDetalhada {
    doacao: Doacao,
    itens: ItemDoacao[]
}
export interface Doacao {
    id: number,
    data: moment.Moment,
    doador_id: number,
    pontos_gerados: number,
    status: number,
    banco_de_alimento_id: number,
    origem: string
}

export interface ItemDoacao {
    item: Item,
    produto: Produto
}
export interface Item {
    id: number,
    quantidade: number,
    doacao_id: number,
    produto_id: number,
    pontos_gerados_item: number,
    unidade_de_medida: string,
    classificacao_id: number
}

export interface Produto {
    id: number,
    nome_produto: string,
    preco_dia: number,
    pastaDeFotos: string
}

export interface DadosDoadorLogado {
    user: {
        id: number,
        name: string,
        email: string,
        cpf: string,
        cnpj: string,
        tipo: number,
        pastaDeFotos: string
    },
    saldo: number,
    quantidade_doacoes: number,
    quantidade_resgates: number
}

export interface RankingEmpresasDto {
    ranking: EmpresasRanking[]
}

export interface EmpresasRanking {
    empresa: EmpresaParceira,
    quantidade_produtos_resgatados: number,
    ranking: number
}

export interface EmpresaParceira {
    id: number,
    nome_empresa: string,
    cnpj: string,
    endereco: string,
    telefone: string,
    email: string,
    pastaDeFotos: string,
}