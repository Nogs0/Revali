<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Seeder;

class DadosEconomia extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cotacao_pontos_doacao')->insert([
            'id' => 1,
            'ponto_em_reais' => 100,
        ]);

        DB::table('cotacao_pontos_itens_resgate')->insert([
            'id' => 1,
            'ponto_em_reais' => 300,
        ]);

        DB::table('classificacoes')->insert([
            [
                'id' => 1,
                'multiplicador' => 0.5,
                'tipo' => 'Regular',
            ],
            [
                'id' => 2,
                'multiplicador' => 0.75,
                'tipo' => 'Bom',
            ],
            [
                'id' => 3,
                'multiplicador' => 1.0,
                'tipo' => 'Ótimo',
            ]
        ]);
        
        
    }
}
