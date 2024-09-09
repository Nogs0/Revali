<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CotacaoPontosDoacao extends Model
{
    use HasFactory;

    protected $table = 'cotacao_pontos_doacao';

    protected $fillable = [
        'ponto_em_reais',
    ];
}

