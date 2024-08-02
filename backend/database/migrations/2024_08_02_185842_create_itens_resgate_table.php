<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItensResgateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('itens_resgate', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resgate_id')->constrained('resgates');
            $table->foreignId('produto_resgate_id')->constrained('produtos_resgate');
            $table->float('valor_item');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('itens_resgate');
    }
}
