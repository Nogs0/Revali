<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyResgates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('resgates', function (Blueprint $table) {
            $table->dropForeign(['produto_resgate_id']); 
            
         
            $table->dropColumn('produto_resgate_id');
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
        
            $table->integer('produto_resgate_id')->unsigned();

     
            $table->foreign('produto_resgate_id')->references('id')->on('produtos_resgate')->onDelete('cascade');
        });
    }
}
