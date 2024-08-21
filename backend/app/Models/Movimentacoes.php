<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movimentacoes extends Model
{
    protected $table = 'movimentacoes';
    protected $fillable = ['data', 'pontos', 'isEntrada', 'banco_de_alimento_id', 'origem','doador_id', 'saldo'];
    public function bancosDeAlimentos()
    {
        return $this->belongsTo(BancosDeAlimentos::class, 'banco_de_alimento_id');
    }
}
