<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CotacaoPontosDoacoes extends Model
{
    use HasFactory;

    protected $table = 'cotacao_pontos_doacoes';

    protected $fillable = [
        'ponto_em_reais',
    ];
}

