<?php

namespace App\Http\Controllers;

use App\Models\Classificacoes;
use App\Models\Doacoes;
use App\Models\ItensDoacao;
use App\Models\ItensResgate;
use App\Models\Movimentacoes;
use App\Models\Produtos;
use App\Models\ProdutosResgate;
use App\Models\Resgates;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;
use Facade\FlareClient\Http\Client;
use GuzzleHttp\Client as GuzzleHttpClient;

class MovimentacoesController extends Controller
{
    public function index()
    {
        try {
            $movimentacoes = Movimentacoes::all();
            return response()->json($movimentacoes);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve records'], 500);
        }
    }

    public function store(Request $request)
    {
        try {

            $movimentacao = Movimentacoes::create($request->all());
            return response()->json($movimentacao, 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to create record'], 500);
        }
    }

    public function show($id)
    {
        try {
            $movimentacao = Movimentacoes::findOrFail($id);
            return response()->json($movimentacao);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Record not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve record'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $movimentacao = Movimentacoes::findOrFail($id);

            $movimentacao->fill($request->all());
            $movimentacao->save();

            return response()->json($movimentacao, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Record not found'], 404);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to update record'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $movimentacao = Movimentacoes::findOrFail($id);
            $movimentacao->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Record not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to delete record'], 500);
        }
    }

    public function show_extrato($id)
    {
        try {
            $doador_id = $id;
            $movimentacoes = Movimentacoes::where('doador_id', $doador_id)
                ->where('origem', '!=', 'movimentação inicial')
                ->orderBy('id')
                ->get();

            $saldo_atual = $movimentacoes->last()->saldo ?? 0;
            return response()->json([
                'saldo_atual' => $saldo_atual,
                'movimentacoes' => $movimentacoes
            ], 200);
        } catch (Exception $e) {
            \Log::error("Erro ao buscar movimentações: " . $e->getMessage());
            return response()->json(['message' => 'Falha ao buscar movimentações'], 500);
        }
    }

    public function show_extrato_detalhado($id_movimentacao)
    {
        try {

            $movimentacao = Movimentacoes::findOrFail($id_movimentacao);

         
            if ($movimentacao->resgate_id) {
            
                $resgate = Resgates::findOrFail($movimentacao->resgate_id);


                $itens_resgate = ItensResgate::where('resgate_id', $resgate->id)->get();

                $produtos_resgate = [];
                foreach ($itens_resgate as $item) {
                    $produto = ProdutosResgate::findOrFail($item->produto_resgate_id);
                    $produtos_resgate[] = [
                        'nome' => $produto->nome,
                        'quantidade' => $item->quantidade,
                        'valor_item' => $item->valor_item,
                        'pastaDeFotos' => $produto->pastaDeFotos
                    ];
                }

                return response()->json([
                    'movimentacao' => $movimentacao,
                    'tipo' => 'resgate',
                    'produtos' => $produtos_resgate
                ], 200);
            } elseif ($movimentacao->doacao_id) {
           
                $doacao = Doacoes::findOrFail($movimentacao->doacao_id);
                $itens_doacao = ItensDoacao::where('doacao_id', $doacao->id)->get();

                $produtos_doacao = [];
                foreach ($itens_doacao as $item) {
                    $produto = Produtos::findOrFail($item->produto_id);
                    $classificacao = Classificacoes::where('id', $item->classificacao_id)->first();
                    $produtos_doacao[] = [
                        'nome' => $produto->nome_produto,
                        'unidade_de_medida' => $item->unidade_de_medida,
                        'quantidade' => $item->quantidade,
                        'pontos_gerados_item' => $item->pontos_gerados_item,
                        'pastaDeFotos' => $produto->pastaDeFotos,
                        'classificacao' => $classificacao->tipo
                    ];
                }

                return response()->json([
                    'movimentacao' => $movimentacao,
                    'tipo' => 'doacao',
                    'produtos' => $produtos_doacao
                ], 200);
            } else {
                return response()->json(['message' => 'Movimentação sem doação ou resgate associado.'], 400);
            }
        } catch (ModelNotFoundException $e) {
            \Log::error("Registro não encontrado: " . $e->getMessage());
            return response()->json(['message' => 'Registro não encontrado'], 404);
        } catch (Exception $e) {
            \Log::error("Erro ao buscar movimentações: " . $e->getMessage());
            return response()->json(['message' => 'Falha ao buscar movimentações'], 500);
        }
    }

}
