<?php

namespace App\Http\Controllers;

use App\Models\BancosDeAlimentos;
use App\Models\Classificacoes;
use App\Models\Doacoes;
use App\Models\ItensDoacao;
use App\Models\Produtos;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

class DoacoesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $doacoes = Doacoes::all();
            return response()->json($doacoes);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve records'], 500);
        }
    }

    public function index_em_andamento()
    {
        try {
            $doacoes = Doacoes::where('status', 0)->orderByDesc('data')->get();
            return response()->json($doacoes);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve records'], 500);
        }
    }

    public function show_itens_doacao($id)
    {
        try {
            $doacao = Doacoes::findOrFail($id);
    
            $itens_doacao = ItensDoacao::where('doacao_id', $doacao->id)
                ->orderByDesc('created_at')
                ->get();
    
            $itens_with_produtos = [];
    
            foreach ($itens_doacao as $item) {
                $produto = Produtos::where('id', $item->produto_id)->first();
                $classificacao = Classificacoes::where('id', $item->classificacao_id)->first();
    
                $itens_with_produtos[] = [
                    'item' => array_merge($item->toArray(), ['classificacao_tipo' => $classificacao->tipo]),
                    'produto' => $produto,
                ];
            }
    
            $response_data = [
                'doacao' => $doacao,
                'itens' => $itens_with_produtos,
            ];
    
            return response()->json($response_data, 200);
        } catch (Exception $e) {
            \Log::error("Failed to retrieve donation items: " . $e->getMessage());
            return response()->json(['message' => 'Failed to retrieve records'], 500);
        }
    }
    


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $banco_de_alimentos = BancosDeAlimentos::where('id', $request->banco_de_alimento_id)->first();
            $doacao = new Doacoes;
            $doacao->doador_id = $request->doador_id;
            $doacao->data = $request->data;
            $doacao->pontos_gerados = $request->pontos_gerados;
            $doacao->status = 0;
            $doacao->banco_de_alimento_id = $request->banco_de_alimento_id;
            $doacao->origem = $banco_de_alimentos->nome;
            $doacao->save();
            return response()->json($doacao, 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to create record'], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $doacao = Doacoes::findOrFail($id);
            return response()->json($doacao);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Record not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve record'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $doacao = Doacoes::findOrFail($id);
            $doacao->fill($request->all());
            $doacao->save();

            return response()->json($doacao, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Record not found'], 404);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to update record'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $doacao = Doacoes::findOrFail($id);
            $doacao->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Record not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to delete record'], 500);
        }
    }
}
