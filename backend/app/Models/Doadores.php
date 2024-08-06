<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doadores extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'pontos',
    ];

    public function user()
    {
        return $this->belongsTo(Users::class, 'user_id');
    }
}
