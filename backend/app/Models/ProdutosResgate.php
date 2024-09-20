<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutosResgate extends Model
{
    use HasFactory;

    protected $table = 'produtos_resgate';
    protected $fillable = [
        'nome',
        'descricao',
        'quantidade',
        'valor',
        'marca',
        'fornecedor',
        'pastaDeFotos',
        'empresas_parceiras_id',
        'quantidade_vendida',
        'pontos_totais_doados',
    ];
    public function empresaParceira()
    {
        return $this->belongsTo(EmpresasParceiras::class, 'empresas_parceiras_id');
    }

}


