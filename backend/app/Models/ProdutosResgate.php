<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutosResgate extends Model
{
    use HasFactory;

    protected $table = 'produtos_resgate';
    protected $fillable = [
        'nome', 'descricao', 'quantidade', 'valor',
    ];
}
