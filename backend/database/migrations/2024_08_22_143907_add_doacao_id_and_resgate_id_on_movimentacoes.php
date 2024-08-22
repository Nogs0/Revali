<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDoacaoIdAndResgateIdOnMovimentacoes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('movimentacoes', function (Blueprint $table) {
            $table->foreignId('doacao_id')
                  ->nullable()
                  ->constrained('doacoes')
                  ->onDelete('set null');

            $table->foreignId('resgate_id')
                  ->nullable()
                  ->constrained('resgates')
                  ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('movimentacoes', function (Blueprint $table) {
            $table->dropForeign(['doacao_id']);
            $table->dropColumn('doacao_id');

            $table->dropForeign(['resgate_id']);
            $table->dropColumn('resgate_id');
        });
    }
}
