<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItensDoacao extends Model
{
    use HasFactory;
    protected $table = 'itens_doacao';
    protected $fillable = [
        'doacao_id', 'produto_id', 'quantidade', 'pontos_gerados_item','unidade_de_medida', 'pastaDeFotos', 'classificacao_id'
    ];

    public function doacoes()
    {
        return $this->belongsTo(Doacoes::class, 'doacao_id');
    }

    public function produtos()
    {
        return $this->belongsTo(Produtos::class, 'produto_id');
    }


}
