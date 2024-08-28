<?php

namespace App\Http\Controllers;

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
            $produtosResgate = ProdutosResgate::all();
            return response()->json($produtosResgate);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve products'], 500);
        }
    }

    public function index_em_estoque()
    {
        try {
            $produtosResgate = ProdutosResgate::where('quantidade', '!=', 0)->get();
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
            $produto->save();

            return response()->json($produto, 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
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
            $produtoResgate = ProdutosResgate::findOrFail($id);
            return response()->json($produtoResgate);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Product not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve product'], 500);
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
