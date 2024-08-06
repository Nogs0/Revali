<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BancosDeAlimentos extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'cep', 'endereco', 'telefone',
    ];

    public function user()
    {
        return $this->belongsTo(Users::class, 'user_id');
    }
}
