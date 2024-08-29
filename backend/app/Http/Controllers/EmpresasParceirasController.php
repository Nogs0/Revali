<?php

namespace App\Http\Controllers;

use App\Models\EmpresasParceiras;
use App\Models\ProdutosResgate;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

class EmpresasParceirasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $empresas = EmpresasParceiras::all();
            return response()->json($empresas);
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
            $empresa = EmpresasParceiras::create($request->all());
            return response()->json($empresa, 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to create record'], 500);
        }
    }

    public function index_ranking()
    {
        try {
            $empresas = EmpresasParceiras::all();
            $ranking = [];
    
            foreach ($empresas as $empresa) {
                $total_dinheiro = ProdutosResgate::where('empresas_parceiras_id', $empresa->id)
                    ->get()
                    ->reduce(function ($carry, $item) {
                        return $carry + ($item->valor * $item->quantidade);
                    }, 0);
    
                $ranking[] = [
                    'empresa' => $empresa,
                    'total_dinheiro_doado' => (int)$total_dinheiro,
                ];
            }
    
            usort($ranking, function ($a, $b) {
                return $b['total_dinheiro_doado'] <=> $a['total_dinheiro_doado'];
            });
    
            foreach ($ranking as $index => $empresa) {
                $ranking[$index]['ranking'] = $index + 1;
            }
    
            return response()->json($ranking, 200);
        } catch (Exception $e) {
            \Log::error("Erro ao buscar ranking de empresas: " . $e->getMessage());
            return response()->json(['message' => 'Falha ao buscar ranking'], 500);
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
            $empresa = EmpresasParceiras::findOrFail($id);
            return response()->json($empresa);
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
            $empresa = EmpresasParceiras::findOrFail($id);
            $empresa->fill($request->all());
            $empresa->save();

            return response()->json($empresa, 200);
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
            $empresa = EmpresasParceiras::findOrFail($id);
            $empresa->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Record not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to delete record'], 500);
        }
    }
}
