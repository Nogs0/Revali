<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameCoatacaoPontosToCotacaoPontosDoacao extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::rename('cotacao_pontos', 'cotacao_pontos_doacao');
    }
    
    public function down()
    {
        Schema::rename('cotacao_pontos_doacao', 'coatacao_pontos');
    }
    
}
