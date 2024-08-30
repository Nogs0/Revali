<?php

namespace App\Http\Controllers;

use App\Models\BancosDeAlimentos;
use App\Models\Classificacoes;
use App\Models\CotacaoPontos;
use App\Models\Doacoes;
use App\Models\ItensDoacao;
use App\Models\Movimentacoes;
use App\Models\Produtos;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ItensDoacaoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $itensDoacao = ItensDoacao::all();
            return response()->json($itensDoacao);
        } catch (Exception $e) {
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
            $request->validate([
                // Adicione aqui suas regras de validação, se necessário
            ]);

            $itemDoacao = ItensDoacao::create($request->all());
            return response()->json($itemDoacao, 201);
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
            $itemDoacao = ItensDoacao::findOrFail($id);
            return response()->json($itemDoacao);
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
            $itemDoacao = ItensDoacao::findOrFail($id);

            $request->validate([
                // Adicione aqui suas regras de validação, se necessário
            ]);

            $itemDoacao->fill($request->all());
            $itemDoacao->save();

            return response()->json($itemDoacao, 200);
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
            $itemDoacao = ItensDoacao::findOrFail($id);
            $itemDoacao->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Record not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to delete record'], 500);
        }
    }

    /**
     * Store a new donation and its items.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store_array_doacoes(Request $request)
    {
        DB::beginTransaction(); 

        try {

            $request->validate([
                'data' => 'required|date',
                'doador_id' => 'required|exists:doadores,id',
                'banco_de_alimento_id' => 'required|exists:bancos_de_alimentos,id',
                'produtos' => 'required|array',
                'produtos.*.produto_id' => 'required|exists:produtos,id',
                'produtos.*.quantidade' => 'required|integer|min:1',
                'produtos.*.classificacoes_id' => 'required|exists:classificacoes,id',
            ]);

            $banco_de_alimentos = BancosDeAlimentos::where('id', $request->banco_de_alimento_id)->first();

            // Criação da nova doação
            $nova_doacao = new Doacoes;
            $nova_doacao->data = $request->data;
            $nova_doacao->doador_id = $request->doador_id;
            $nova_doacao->banco_de_alimento_id = $request->banco_de_alimento_id;
            $nova_doacao->status = 0; // Status inicial da doação
            $nova_doacao->pontos_gerados = 0;
            $nova_doacao->origem = $banco_de_alimentos->nome;
            $nova_doacao->save();

            $soma_pontos = 0;

            $cotacao = CotacaoPontos::first();


            foreach ($request['produtos'] as $cd) {
                $novo_produto = new ItensDoacao;
                $produto = Produtos::where('id', $cd['produto_id'])->first();
                $novo_produto->doacao_id = $nova_doacao->id;
                $novo_produto->produto_id = $cd['produto_id'];
                $novo_produto->quantidade = $cd['quantidade'];
                $novo_produto->unidade_de_medida = 'kg';
                $novo_produto->pastaDeFotos = $produto->pastaDeFotos;
                $classificacao = Classificacoes::findOrFail($cd['classificacoes_id']);
                $novo_produto->classificacao_id = $classificacao->id;
                $novo_produto->pontos_gerados_item = (($produto->preco_dia * $cd['quantidade'])/$cotacao->ponto_em_reais) * $classificacao->multiplicador;
                $novo_produto->save();

                $soma_pontos += $novo_produto->pontos_gerados_item;
            }         

            $nova_doacao->pontos_gerados = $soma_pontos;
            $nova_doacao->save();

            DB::commit();

            return response()->json($nova_doacao, 201);

        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json(['message' => 'Classificacao ou registro relacionado não encontrado'], 404);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to process donation'], 500);
        }
    }

}
