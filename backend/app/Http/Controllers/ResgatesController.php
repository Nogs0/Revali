<?php

namespace App\Http\Controllers;

use App\Models\Resgates;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

class ResgatesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $resgates = Resgates::all();
            return response()->json($resgates);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve rescues'], 500);
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
            $resgate = Resgates::create($request->all());
            return response()->json($resgate, 201);
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
            $resgate = Resgates::findOrFail($id);
            return response()->json($resgate);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Rescue not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve rescue'], 500);
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
            $resgate = Resgates::findOrFail($id);

            $request->validate([
                // Adicione aqui suas regras de validação, se necessário
            ]);

            $resgate->fill($request->all());
            $resgate->save();

            return response()->json($resgate, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Rescue not found'], 404);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to update rescue'], 500);
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
            $resgate = Resgates::findOrFail($id);
            $resgate->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Rescue not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to delete rescue'], 500);
        }
    }
}
