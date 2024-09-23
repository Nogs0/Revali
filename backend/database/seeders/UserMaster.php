<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserMaster extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
           
        $userId = DB::table('users')->insertGetId([
            'name' => 'Revali User Master',
            'email' => 'aplicativo.revali@gmail.com',
            'password' => '$2y$10$BKMIHVXgJZbC1QbaJfRoM.2cX9oBhVTb7XVJOYj/Or6zpc9mF/X9i',
            'tipo' => 0,
            'banco_de_alimento_id' => null, 
            'pastaDeFotos' => 'https://via.placeholder.com/150',
        ]);

       
        $doadorId = DB::table('doadores')->insertGetId([
            'user_id' => $userId, 
            'pontos' => 0,
        ]);

     
        DB::table('movimentacoes')->insert([
            'data' => now(),  
            'pontos' => 100,  
            'isEntrada' => 1,  
            'banco_de_alimento_id' => null,  
            'origem' => 'Doação inicial',  
            'created_at' => now(),  
            'updated_at' => now(),  
            'doador_id' => $doadorId,  
            'saldo' => 999999,  
            'doacao_id' => null,  
            'resgate_id' => null, 
        ]);
    }
}
