<?php

namespace App\Http\Controllers;

use App\Models\CotacaoPontosItensResgate;
use App\Models\EmpresasParceiras;
use App\Models\ProdutosResgate;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

class ProdutosResgateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $produtosResgate = ProdutosResgate::with('empresaParceira')->get();
            return response()->json($produtosResgate);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve products'], 500);
        }
    }

    public function index_em_estoque()
    {
        try {
            $produtosResgate = ProdutosResgate::where('quantidade', '!=', 0)->with('empresaParceira')->get();
            return response()->json($produtosResgate);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve products'], 500);
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
            $produto = new ProdutosResgate;
            $produto->fill($request->all());
            if ($file = $request->file('pastaDeFotos')) {
                $file_path = $file->getPathName();

                // Set up the Guzzle client
                $client = new \GuzzleHttp\Client();
                $response = $client->request('POST', 'https://api.imgur.com/3/image', [
                    'headers' => [
                        'authorization' => 'Client-ID ' . env('IMGUR_CLIENT_ID'), // Fetch the Client-ID from .env file
                        'content-type' => 'application/x-www-form-urlencoded',
                    ],
                    'form_params' => [
                        'image' => base64_encode(file_get_contents($file_path)) // Get and encode the image
                    ],
                ]);

                // Decode the response from Imgur
                $responseData = json_decode($response->getBody(), true);
                $imgurLink = $responseData['data']['link'];
                $produto->pastaDeFotos = $imgurLink;
            } else {
                $url = 'https://via.placeholder.com/150';
                $produto->pastaDeFotos = $url;
            }
            $cotacao = CotacaoPontosItensResgate::first();
        
            $produto->valor = $cotacao->ponto_em_reais*$request->valor;
            $produto->pontos_totais_doados = $produto->quantidade * $produto->valor;
            $produto->quantidade_vendida = 0;
            $produto->save();

            return response()->json($produto, 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            \Log::error("Erro: " . $e->getMessage());
            return response()->json(['message' => 'Failed to create product'], 500);
        }
    }

    public function adicionarProduto(Request $request, $id)
    {
        try {
            $produtoResgate = ProdutosResgate::findOrFail($id);

            $produtoResgate->fill($request->all());

            if($request->quantidade_adicionada <= 0)
            {
                return response()->json(['message' => 'Failed to create product'], 500);
            }

            $produtoResgate->pontos_totais_doados = $produtoResgate->pontos_totais_doados + ($produtoResgate->valor * $request->quantidade_adicionada);
            $produtoResgate->quantidade = $produtoResgate->quantidade + $request->quantidade_adicionada;
            $produtoResgate->save();

            return response()->json($produtoResgate, 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            \Log::error("Erro: " . $e->getMessage());
            return response()->json(['message' => 'Failed to create product'], 500);
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
            $produtoResgate = ProdutosResgate::with('empresaParceira')->findOrFail($id);

            return response()->json($produtoResgate);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Product not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve product'], 500);
        }
    }

    public function filtro(Request $request)
    {
        try {
            $query = ProdutosResgate::with('empresaParceira')->where('quantidade', '!=', 0); // Carrega a relação empresaParceira

            if ($request->nome) {
                $query->where('nome', 'like', '%' . $request->nome . '%');
            }

            if ($request->marca) {
                $query->where('marca', 'like', '%' . $request->marca . '%');
            }

            if ($request->menor_preco) {
                $query->orderBy('valor', 'asc');
            }

            if ($request->maior_preco) {
                $query->orderBy('valor', 'desc');
            }

            if ($request->mais_vendidos) {
                $query->orderBy('quantidade_vendida', 'desc');
            }

            $produtos = $query->get();

            return response()->json($produtos, 200);
        } catch (Exception $e) {
            \Log::error("Erro ao filtrar produtos: " . $e->getMessage());
            return response()->json(['message' => 'Falha ao filtrar produtos'], 500);
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
            $produtoResgate = ProdutosResgate::findOrFail($id);

            $request->validate([
                // Adicione aqui suas regras de validação, se necessário
            ]);

            $produtoResgate->fill($request->all());
            $cotacao = CotacaoPontosItensResgate::first();
        
            $produtoResgate->valor = $cotacao->ponto_em_reais*$request->valor;
            $produtoResgate->save();

            return response()->json($produtoResgate, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Product not found'], 404);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to update product'], 500);
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
            $produtoResgate = ProdutosResgate::findOrFail($id);
            $produtoResgate->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Product not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to delete product'], 500);
        }
    }
}
