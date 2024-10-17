<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPrecoDiaToItensDoacaoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('itens_doacao', function (Blueprint $table) {
            $table->decimal('preco_dia', 8, 2)->nullable()->after('quantidade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('itens_doacao', function (Blueprint $table) {
            $table->dropColumn('preco_dia');
        });
    }
}
