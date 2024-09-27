<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UpdateCotacaoPontosResgate extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       
        DB::table('cotacao_pontos_itens_resgate')->updateOrInsert(
            ['id' => 1], 
            ['ponto_em_reais' => 600],
        );
    }
}
