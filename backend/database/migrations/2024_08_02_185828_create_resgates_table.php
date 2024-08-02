<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResgatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resgates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('doador_id')->constrained('doadores');
            $table->foreignId('produto_resgate_id')->constrained('produtos_resgate');
            $table->float('valor');
            $table->date('data');
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
        Schema::dropIfExists('resgates');
    }
}
