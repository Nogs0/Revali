interface Empresa {
    id: number;
    nome_empresa: string;
    cnpj: string;
    endereco: string;
    telefone: string;
    email: string;
    descricao: string | null;
}

export interface CompanyData {
    empresa: Empresa;
    total_dinheiro_doado: number;
    ranking: number;
}

