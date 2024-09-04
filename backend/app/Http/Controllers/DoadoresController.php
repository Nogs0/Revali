<?php

namespace App\Http\Controllers;

use App\Models\Doacoes;
use App\Models\Doadores;
use App\Models\ItensDoacao;
use App\Models\Movimentacoes;
use App\Models\Resgates;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;

class DoadoresController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            
            $donors = Doadores::with('user')->get();
    
           
            $donors->each(function ($doador) {
                $doador->user->makeHidden('password');
            });
    
            return response()->json($donors, 200);
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

            $doador = Doadores::create($request->all());

            $movimentacao = new Movimentacoes;
            $movimentacao->data = now();
            $movimentacao->pontos = 0;
            $movimentacao->isEntrada = 1;
            $movimentacao->origem = "movimentação inicial";
            $movimentacao->doador_id = $doador->id;
            $movimentacao->saldo = 0;
            $movimentacao->save();

            return response()->json($doador, 201);
        } catch (ValidationException $e) {
            \Log::error($e->getMessage());
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            \Log::error($e->getMessage());
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
            $doador = Doadores::findOrFail($id);
            return response()->json($doador);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Record not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve record'], 500);
        }
    }

    public function index_ranking()
    {
        try {
            // Obter todos os doadores
            $donors = Doadores::all();
            $ranking = [];
    
            foreach ($donors as $doador) {

                $pontosGerados = Doacoes::where('doador_id', $doador->id)
                    ->sum('pontos_gerados');
                $user = Users::where('id', $doador->user_id)->first();
    
            
                $doador->nome = $user->name;
    
             
                $ranking[] = [
                    'doador' => $doador,
                    'pontos_gerados' => (int)$pontosGerados,
                ];
            }
    
         
            usort($ranking, function ($a, $b) {
                return $b['pontos_gerados'] <=> $a['pontos_gerados'];
            });
    

            foreach ($ranking as $index => $entry) {
                $ranking[$index]['ranking'] = $index + 1;
            }
    
            return response()->json($ranking, 200);
        } catch (Exception $e) {
            \Log::error("Erro ao buscar ranking de doadores: " . $e->getMessage());
            return response()->json(['message' => 'Falha ao buscar ranking'], 500);
        }
    }
    

    public function doador_logado()
    {
        try {
            
            $user = JWTAuth::parseToken()->authenticate();
    
           
            if (!$user) {
                return response()->json(['message' => 'Usuário não encontrado'], 404);
            }
    

            $user->makeHidden(['password', 'remember_token']);
    
           
            $doador = Doadores::where('user_id', $user->id)->first();
            if (!$doador) {
                return response()->json(['message' => 'Doador não encontrado'], 404);
            }
 
            $quantidade_doacoes = Doacoes::where('doador_id', $doador->id)->count();
            $quantidade_doacoes = $quantidade_doacoes > 0 ? $quantidade_doacoes : 0;
    
   
            $quantidade_resgates = Resgates::where('doador_id', $doador->id)->count();
            $quantidade_resgates = $quantidade_resgates > 0 ? $quantidade_resgates : 0;
    
            
            if(!$movimentacao = Movimentacoes::where('doador_id', $doador->id)->orderByDesc('created_at')->first())
            {
                $saldo = 0;
            }else{
                $saldo = (float)$movimentacao->saldo;
            }
            
    
            return response()->json([
                'user' => $user,
                'doador_id'=>$doador->id,
                'saldo' => $saldo,
                'quantidade_doacoes' => $quantidade_doacoes,
                'quantidade_resgates' => $quantidade_resgates,
            ], 200);
        } catch (Exception $e) {
            \Log::error("Erro ao buscar usuário logado: " . $e->getMessage());
            return response()->json(['message' => 'Falha ao buscar usuário logado'], 500);
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
            $doador = Doadores::findOrFail($id);

            $request->validate([
                // Adicione aqui suas regras de validação, se necessário
            ]);

            $doador->fill($request->all());
            $doador->save();

            return response()->json($doador, 200);
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
            $doador = Doadores::findOrFail($id);
            $doador->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Record not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to delete record'], 500);
        }
    }
}
