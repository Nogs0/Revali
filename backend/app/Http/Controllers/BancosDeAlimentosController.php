<?php

namespace App\Http\Controllers;

use App\Models\BancosDeAlimentos;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

class BancosDeAlimentosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $bancosDeAlimentos = BancosDeAlimentos::all();
            return response()->json($bancosDeAlimentos);
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

            $bancoDeAlimento = BancosDeAlimentos::create($request->all());
            return response()->json($bancoDeAlimento, 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to create record'], 500);
        }
    }

    public function storeBancoWithUser(Request $request)
    {
        try {
            $request->validate([
                // Adicione aqui suas regras de validação, se necessário
            ]);

            $bancoDeAlimento = BancosDeAlimentos::create($request->only(['cep', 'endereco', 'telefone', 'nome']));
            $user = Users::create([
                'name' => $request->nome_usuario,
                'email' => $request->email,
                'password' => $request->senha,
                'tipo' => 0, //banco de alimentos,
                'cpf' => $request->cpf,
                'cnpj' => $request->cnpj,
                'banco_de_alimento_id' => $bancoDeAlimento->id,
                'pastaDeFotos' => 'https://via.placeholder.com/150'
            ]);

            return response()->json([
                'banco_de_alimento' => $bancoDeAlimento,
                'user' => $user
            ], 201);

        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => $e], 500);
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
            $bancoDeAlimento = BancosDeAlimentos::findOrFail($id);
            return response()->json($bancoDeAlimento);
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
            $bancoDeAlimento = BancosDeAlimentos::findOrFail($id);

            $request->validate([
                // Adicione aqui suas regras de validação, se necessário
            ]);

            $bancoDeAlimento->fill($request->all());
            $bancoDeAlimento->save();

            return response()->json($bancoDeAlimento, 200);
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
            $bancoDeAlimento = BancosDeAlimentos::findOrFail($id);
            $bancoDeAlimento->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Record not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to delete record'], 500);
        }
    }
}
