<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CotacaoPontos;
use Dotenv\Exception\ValidationException;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CotacaoPontosController extends Controller
{
    public function index()
    {
        try {
            $cotacao = CotacaoPontos::latest()->first();
            return response()->json($cotacao, 200);
        } catch (Exception $e) {
            \Log::error("Erro ao buscar cotação dos pontos: " . $e->getMessage());
            return response()->json(['message' => 'Falha ao buscar cotação'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $pontos = CotacaoPontos::findOrFail($id);
            $pontos->fill($request->all());
            $pontos->save();

            return response()->json($pontos, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Record not found'], 404);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to update record'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'ponto_em_reais' => 'required|numeric|min:0',
            ]);

            $cotacao = CotacaoPontos::create($request->all());
            return response()->json($cotacao, 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Erro de validação', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            \Log::error("Erro ao criar cotação dos pontos: " . $e->getMessage());
            return response()->json(['message' => 'Falha ao criar cotação'], 500);
        }
    }
}