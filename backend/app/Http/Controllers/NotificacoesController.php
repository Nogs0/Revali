<?php

namespace App\Http\Controllers;

use App\Models\Notificacoes;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

class NotificacoesController extends Controller
{
    public function index()
    {
        try {
            $notificacoes = Notificacoes::all();
            return response()->json($notificacoes);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve records'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                // Adicione aqui suas regras de validação, se necessário
            ]);

            $notificacao = Notificacoes::create($request->all());
            return response()->json($notificacao, 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to create record'], 500);
        }
    }

    public function show($id)
    {
        try {
            $notificacao = Notificacoes::findOrFail($id);
            return response()->json($notificacao);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Record not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve record'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $notificacao = Notificacoes::findOrFail($id);

            $request->validate([
                // Adicione aqui suas regras de validação, se necessário
            ]);

            $notificacao->fill($request->all());
            $notificacao->save();

            return response()->json($notificacao, 200);
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
            $notificacao = Notificacoes::findOrFail($id);
            $notificacao->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Record not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to delete record'], 500);
        }
    }
}

