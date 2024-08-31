<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmpresasParceiras extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome_empresa',
        'cnpj',
        'endereco',
        'telefone',
        'email',
        'pastaDeFotos',
        'descricao',
    ];
}
