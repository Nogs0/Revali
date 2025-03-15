<?php

namespace App\Http\Controllers;

use App\Models\BancosDeAlimentos;
use App\Models\Doacoes;
use App\Models\Doadores;
use App\Models\ItensDoacao;
use App\Models\ProdutosResgate;
use App\Models\Resgates;
use App\Models\Users;
use Exception;

class DashboardController extends Controller
{
    public function getQuantidadeDeDoacoesPorBanco()
    {
        try {

            $bancos = BancosDeAlimentos::all();
            $dicionario = [];
            foreach ($bancos as $banco) {
                $doacoesDoBanco = Doacoes::where('banco_de_alimento_id', $banco->id)->pluck('id');
                $quantidade = ItensDoacao::whereIn('doacao_id', $doacoesDoBanco)->sum('quantidade');
                $dicionario[$banco->nome] = $quantidade;
            }
            return response()->json($dicionario);
        } catch (Exception $e) {
            return response()->json(['message' => $e], 500);
        }
    }

    public function getQuantidadeDeProdutosPorBanco()
    {
        try {
            $bancos = BancosDeAlimentos::all();
            $dicionario = [];
            foreach ($bancos as $banco) {
                $quantidade = ProdutosResgate::where('banco_de_alimento_id', $banco->id)->count();
                $dicionario[$banco->nome] = $quantidade;
            }
            return response()->json($dicionario);
        } catch (Exception $e) {
            return response()->json(['message' => $e], 500);
        }
    }

    public function getQuantidadeDeResgatesPorBanco()
    {
        try {
            $bancos = BancosDeAlimentos::all();
            $dicionario = [];
            foreach ($bancos as $banco) {
                $quantidade = Resgates::where('banco_de_alimento_id', $banco->id)->count();
                $dicionario[$banco->nome] = $quantidade;
            }
            return response()->json($dicionario);
        } catch (Exception $e) {
            return response()->json(['message' => $e], 500);
        }
    }
}
