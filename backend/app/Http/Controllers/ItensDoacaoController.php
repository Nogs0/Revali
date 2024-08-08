<?php

namespace App\Http\Controllers;

use App\Models\Classificacoes;
use App\Models\Doacoes;
use App\Models\ItensDoacao;
use Illuminate\Http\Request;

class ItensDoacaoController extends Controller
{
    public function index()
    {
        return ItensDoacao::all();
    }

    public function store(Request $request)
    {
        $itemDoacao = ItensDoacao::create($request->all());
        return response()->json($itemDoacao, 201);
    }

    public function show($id)
    {
        return ItensDoacao::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $itemDoacao = ItensDoacao::find($id);

        $itemDoacao->fill($request->all());
        $itemDoacao->save();

        return response()->json($itemDoacao, 200);
    }

    public function destroy($id)
    {
        ItensDoacao::findOrFail($id)->delete();
        return response()->json(null, 204);
    }

    public function store_array_doacoes(Request $request)
    {
        $nova_doacao = new Doacoes;
        $nova_doacao->data = $request->data;
        $nova_doacao->doador_id = $request->doador_id;
        $nova_doacao->banco_de_alimento_id = $request->banco_de_alimento_id;
        $nova_doacao->status = 0;
        $nova_doacao->pontos_gerados = 0;
        $nova_doacao->save();

        $soma_pontos = 0; // Declara e inicializa a variável soma_pontos

        if (isset($request['produtos'])) {
            foreach ($request['produtos'] as $cd) {
                $novo_produto = new ItensDoacao;
                $novo_produto->doacao_id = $nova_doacao->id;
                $novo_produto->produto_id = $cd['produto_id'];
                $novo_produto->quantidade = $cd['quantidade'];
                $classificacao = Classificacoes::where('id', $cd['classificacoes_id'])->first();
                $novo_produto->pontos_gerados_item = (10 * $cd['quantidade']) * $classificacao->multiplicador;
                $novo_produto->save();
                $soma_pontos += $novo_produto->pontos_gerados_item;
            }
        }

        $doacao = Doacoes::findOrFail($nova_doacao->id);
        $doacao->pontos_gerados = $soma_pontos;
        $doacao->save();

        return response()->json($nova_doacao, 201); // Retorna a nova doação em vez do produto
    }
}
