<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resgates extends Model
{
    use HasFactory;

    protected $fillable = [
        'doador_id', 'produto_resgate_id', 'valor', 'data',
    ];

    public function doadores()
    {
        return $this->belongsTo(Doadores::class, 'doador_id');
    }

    public function produtosResgates()
    {
        return $this->belongsTo(ProdutosResgate::class, 'produto_resgate_id');
    }
}