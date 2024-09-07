<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CotacaoPontosItensResgate extends Model
{
    use HasFactory;

    protected $table = 'cotacao_pontos_itens_resgate';

    protected $fillable = [
        'ponto_em_reais',
    ];
}

