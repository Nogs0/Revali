<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notificacoes extends Model
{
    protected $table = 'notificacoes';
    protected $fillable = ['titulo', 'data', 'conteudo', 'tela', 'id_item'];
}
