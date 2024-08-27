<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmpresasParceirasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empresas_parceiras', function (Blueprint $table) {
            $table->id();
            $table->string('nome_empresa');
            $table->string('cnpj')->unique();
            $table->string('endereco');
            $table->string('telefone');
            $table->string('email')->unique();
            $table->string('pastaDeFotos');
            $table->text('descricao')->nullable();
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
        Schema::dropIfExists('empresas_parceiras');
    }
}
