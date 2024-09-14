interface ItemResgate {
    id: number;
    nome: string;
    descricao: string;
    quantidade: number;
    valor: number;
    marca: string;
    pastaDeFotos: string;
  }
  
  interface Doador {
    nome: string;
    email: string;
  }
  
  interface EmpresaParceira {
    nome_empresa: string;
    cnpj: string;
    email: string;
    pastaDeFotos: string;
  }
  
  // Define a interface principal para os dados recebidos do GET
  export interface ResgateData {
    item_resgate: ItemResgate;
    doador: Doador;
    empresa_parceira: EmpresaParceira;
  }