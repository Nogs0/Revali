<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItensResgate extends Model
{
    use HasFactory;
    protected $table = 'itens_resgate';
    protected $fillable = [
        'resgate_id', 'produto_resgate_id', 'valor_item','quantidade', 'foi_resgatado',
    ];

    public function resgates()
    {
        return $this->belongsTo(Resgates::class, 'resgates_id');
    }

    public function produtosResgate()
    {
        return $this->belongsTo(ProdutosResgate::class, 'produto_resgate_id');
    }
}
