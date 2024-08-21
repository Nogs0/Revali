<?php

namespace App\Http\Controllers;

use App\Models\Movimentacoes;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

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

}
