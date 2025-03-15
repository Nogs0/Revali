<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFkBancoInResgates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('resgates', function (Blueprint $table) {
            $table->unsignedBigInteger('banco_de_alimento_id');
            $table->foreign('banco_de_alimento_id')->references('id')->on('bancos_de_alimentos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('resgates', function (Blueprint $table) {
            $table->dropForeign('resgates_banco_de_alimento_id_foreign');
        });
    }
}
