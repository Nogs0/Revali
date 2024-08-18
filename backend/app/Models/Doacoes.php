<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doacoes extends Model
{
    use HasFactory;

    protected $fillable = [
        'data', 'doador_id', 'pontos_gerados', 'status', 'banco_de_alimento_id',
    ];

    public function doadores()
    {
        return $this->belongsTo(Doadores::class, 'doadores_id');
    }

    public function bancosDeAlimentos()
    {
        return $this->belongsTo(BancosDeAlimentos::class, 'banco_de_alimento_id');
    }
}
