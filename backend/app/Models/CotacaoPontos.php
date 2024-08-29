<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CotacaoPontos extends Model
{
    use HasFactory;

    protected $table = 'cotacao_pontos';

    protected $fillable = [
        'ponto_em_reais',
    ];
}

