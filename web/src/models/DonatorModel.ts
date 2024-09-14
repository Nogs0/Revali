interface User {
    id: number;
    name: string;
    email: string;
    cpf: string;
    cnpj: string | null;
    tipo: number;
    remember_token: string | null;
    created_at: string;
    updated_at: string;
    pastaDeFotos: string;
    banco_de_alimento_id: number;
  }
  
  export interface Donator {
    id: number;
    user_id: number;
    pontos: number;
    created_at: string;
    updated_at: string;
    user: User;
  }