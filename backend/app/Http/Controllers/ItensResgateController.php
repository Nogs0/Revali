<?php

namespace App\Http\Controllers;

use App\Models\Doadores;
use App\Models\EmpresasParceiras;
use App\Models\ItensResgate;
use App\Models\Movimentacoes;
use App\Models\ProdutosResgate;
use App\Models\Resgates;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Support\Facades\DB;

class ItensResgateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $itensResgate = ItensResgate::all();
            return response()->json($itensResgate);
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

            $itemResgate = ItensResgate::create($request->all());
            return response()->json($itemResgate, 201);
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
            $itemResgate = ItensResgate::findOrFail($id);
            return response()->json($itemResgate);
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
            $itemResgate = ItensResgate::findOrFail($id);

            $request->validate([
                // Adicione aqui suas regras de validação, se necessário
            ]);

            $itemResgate->fill($request->all());
            $itemResgate->save();

            return response()->json($itemResgate, 200);
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
            $itemResgate = ItensResgate::findOrFail($id);
            $itemResgate->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Record not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to delete record'], 500);
        }
    }


    public function mudar_status(Request $request)
    {
        try {

            if (!$itens_resgate = ItensResgate::where('id', $request->id)->first()) {
                return response()->json(['message' => 'Item de resgate não encontrado'], 404);
            }

            $itens_resgate->foi_resgatado = $request->foi_resgatado;


            return response()->json($itens_resgate, 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            \Log::error("Erro: " . $e->getMessage());
            return response()->json(['message' => 'Falha ao mudar status'], 500);
        }
    }

    public function index_nao_resgatados()
    {
        try {
           
            $itens_resgate = ItensResgate::where('foi_resgatado', 0)->with('produtosResgate')->get();
    
            $resposta = $itens_resgate->map(function ($item) {
                
                $resgate = Resgates::where('id', $item->resgate_id)->first();
               
                $doador = Doadores::where('id', $resgate->doador_id)->with('user')->first();
              
                $empresa_parceira = EmpresasParceiras::where('id', $item->produtosResgate->empresas_parceiras_id)->first();
    
                return [
                    'item_resgate' => [
                        'id' => $item->produtosResgate->id,
                        'nome' => $item->produtosResgate->nome,
                        'descricao' => $item->produtosResgate->descricao,
                        'quantidade' => $item->produtosResgate->quantidade,
                        'valor' => $item->produtosResgate->valor,
                        'marca' => $item->produtosResgate->marca,
                        'pastaDeFotos' => $item->produtosResgate->pastaDeFotos,
                    ],
                    'doador' => [
                        'nome' => $doador->user->name,
                        'email' => $doador->user->email,
                    ],
                    'empresa_parceira' => [
                        'nome_empresa' => $empresa_parceira->nome_empresa,
                        'cnpj' => $empresa_parceira->cnpj,
                        'email' => $empresa_parceira->email,
                        'pastaDeFotos' => $empresa_parceira->pastaDeFotos,
                    ]
                ];
            });
    
            return response()->json($resposta, 200);
        } catch (Exception $e) {
            \Log::error("Erro: " . $e->getMessage());
            return response()->json(['message' => 'Erro ao buscar itens resgate'], 500);
        }
    }
    


    public function store_array_resgates(Request $request)
    {
        DB::beginTransaction();

        try {

            foreach ($request['itens'] as $cd) {
                $item = ProdutosResgate::where('id', $cd['id'])->first();
                if (!$item) {
                    return response()->json(['message' => 'Produto não encontrado.'], 404);
                }
                if ($item->quantidade < $cd['quantidade']) {
                    return response()->json(['message' => 'Quantidade insuficiente para o item: ' . $item->nome], 400);
                }
            }

            $soma_resgates = 0;
            $nomesItens = [];

            foreach ($request['itens'] as $cd) {
                $item = ProdutosResgate::where('id', $cd['id'])->first();
                $soma_resgates += $item->valor * $cd['quantidade'];
            }

            // Verificar o saldo atual do doador
            if (!$checa_saldo = Movimentacoes::where('doador_id', $request->doador_id)->orderByDesc('id')->lockForUpdate()->first()) {
                return response()->json(['message' => 'Doador não possui movimentações'], 404);
            }

            if ($checa_saldo->saldo < $soma_resgates) {
                return response()->json(['message' => 'Doador com saldo insuficiente.'], 400);
            }

            // Criar o novo resgate
            $novo_resgate = new Resgates;
            $novo_resgate->data = $request->data;
            $novo_resgate->doador_id = $request->doador_id;
            $novo_resgate->valor = 0;
            $novo_resgate->save();

            foreach ($request['itens'] as $cd) {
                $novo_produto = new ItensResgate;
                $novo_produto->resgate_id = $novo_resgate->id;
                $novo_produto->produto_resgate_id = $cd['id'];
                $novo_produto->quantidade = $cd['quantidade'];
                $novo_produto->foi_resgatado = 0;
                $item = ProdutosResgate::where('id', $cd['id'])->first();

                $item->quantidade_vendida += $cd['quantidade'];
                $item->quantidade -= $novo_produto->quantidade;
                $novo_produto->valor_item = $item->valor * $novo_produto->quantidade;

                $nomesItens[] = $item->nome;

                $novo_produto->save();
                $item->save();
            }

            // Atualiza o valor total do resgate
            $novo_resgate->valor = $soma_resgates;
            $novo_resgate->save();

            // Criar a movimentação para registrar a saída de pontos e o novo saldo
            $movimentacao = new Movimentacoes;
            $movimentacao->resgate_id = $novo_resgate->id;
            $movimentacao->saldo = $checa_saldo->saldo - $soma_resgates;
            $movimentacao->doador_id = $request->doador_id;
            $movimentacao->data = $request->data;
            $movimentacao->pontos = $soma_resgates;
            $movimentacao->isEntrada = 0;

            $nomesItensString = implode(', ', $nomesItens);
            $movimentacao->origem = "Resgate de itens: " . $nomesItensString;

            $movimentacao->save();

            DB::commit();

            return response()->json($novo_resgate, 201);
        } catch (ValidationException $e) {
            \Log::error("Erro " . $e->getMessage());
            DB::rollBack();
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (ModelNotFoundException $e) {
            \Log::error("Erro " . $e->getMessage());
            DB::rollBack();
            return response()->json(['message' => 'Produto ou registro relacionado não encontrado'], 404);
        } catch (Exception $e) {
            \Log::error("Erro " . $e->getMessage());
            DB::rollBack();
            return response()->json(['message' => 'Falha ao processar o resgate'], 500);
        }
    }
}
