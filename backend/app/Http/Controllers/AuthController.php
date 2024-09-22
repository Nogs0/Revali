<?php

namespace App\Http\Controllers;

use App\Models\BancosDeAlimentos;
use App\Models\Doadores;
use App\Models\Movimentacoes;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password as PasswordRule;
use Exception;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            // Validação dos dados de entrada
            $request->validate([
                'name' => 'required|string|max:255',
                'pastaDeFotos' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'cpf' => 'required|string|max:14',
            ]);

            if ($request->cpf) {
                $existingUser = Users::where(function ($query) use ($request) {
                    if ($request->cpf) {
                        $query->where('cpf', $request->cpf)
                            ->whereNotNull('cpf');
                    }
                })->first();

                if ($existingUser) {
                    return response()->json(['message' => 'CPF ou CNPJ já registrado'], 400);
                }
            }


            // URL da imagem padrão
            $defaultImageUrl = 'https://via.placeholder.com/150';

            // Processa o upload da imagem
            if ($file = $request->file('pastaDeFotos')) {
                $file_path = $file->getPathName();

                $client = new \GuzzleHttp\Client();
                $response = $client->request('POST', 'https://api.imgur.com/3/image', [
                    'headers' => [
                        'authorization' => 'Client-ID ' . env('IMGUR_CLIENT_ID'),
                        'content-type' => 'application/x-www-form-urlencoded',
                    ],
                    'form_params' => [
                        'image' => base64_encode(file_get_contents($file_path))
                    ],
                ]);

                $responseData = json_decode($response->getBody(), true);

                if ($responseData['success']) {
                    $imageUrl = $responseData['data']['link'];
                } else {
                    return response()->json(['message' => 'Image upload failed'], 500);
                }
            } else {
                $imageUrl = $defaultImageUrl; // Usa a imagem padrão se nenhuma for enviada
            }

            // Cria o usuário
            $user = Users::create([
                'name' => $request->name,
                'email' => $request->cpf,
                'password' => Hash::make($request->cpf),
                'cpf' => $request->cpf,
                'tipo' => 2,
                'pastaDeFotos' => $imageUrl,
                'banco_de_alimento_id' => $request->banco_de_alimento_id
            ]);

            // Cria o doador associado ao usuário
            $doador = new Doadores;
            $doador->user_id = $user->id;
            $doador->pontos = 0;
            $doador->save();

            // Cria a movimentação inicial do doador
            $movimentacao = new Movimentacoes;
            $movimentacao->data = now();
            $movimentacao->pontos = 0;
            $movimentacao->isEntrada = 1;
            $movimentacao->origem = "movimentação inicial";
            $movimentacao->doador_id = $doador->id;
            $movimentacao->saldo = 0;
            $movimentacao->save();

            // Gera o token JWT para o novo usuário
            $token = JWTAuth::fromUser($user);

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'banco_de_alimento_id' => $user->banco_de_alimento_id,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            \Log::error($e->getMessage());
            return response()->json(['message' => 'Registration failed', 'error' => $e->getMessage()], 500);
        }
    }


    public function register_doador(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'cpf' => 'required|string|max:14',
            ]);

            if ($request->cpf) {
                $existingUser = Users::where(function ($query) use ($request) {
                    if ($request->cpf) {
                        $query->where('cpf', $request->cpf)
                            ->whereNotNull('cpf');
                    }
                })->first();

                if ($existingUser) {
                    return response()->json(['message' => 'CPF ou CNPJ já registrado'], 400);
                }
            }


            $defaultImageUrl = 'https://via.placeholder.com/150';

            // Handle image upload
            if ($file = $request->file('pastaDeFotos')) {
                $file_path = $file->getPathName();

                $client = new \GuzzleHttp\Client();
                $response = $client->request('POST', 'https://api.imgur.com/3/image', [
                    'headers' => [
                        'authorization' => 'Client-ID ' . env('IMGUR_CLIENT_ID'),
                        'content-type' => 'application/x-www-form-urlencoded',
                    ],
                    'form_params' => [
                        'image' => base64_encode(file_get_contents($file_path))
                    ],
                ]);

                $responseData = json_decode($response->getBody(), true);

                if ($responseData['success']) {
                    $imageUrl = $responseData['data']['link'];
                } else {
                    return response()->json(['message' => 'Image upload failed'], 500);
                }
            } else {
                $imageUrl = $defaultImageUrl; // Use default image if none is uploaded
            }

            $user = Users::create([
                'name' => $request->name,
                'email' => $request->cpf,
                'cpf' => $request->cpf,
                'password' => Hash::make($request->cpf),
                'pastaDeFotos' => $imageUrl,
                'tipo' => 2,
                'banco_de_alimento_id' => $request->banco_de_alimento,
                'primeiro_acesso' => 1,
            ]);

            $doador = new Doadores;
            $doador->user_id = $user->id;
            $doador->pontos = 0;
            $doador->save();

            $movimentacao = new Movimentacoes;
            $movimentacao->data = now();
            $movimentacao->pontos = 0;
            $movimentacao->isEntrada = 1;
            $movimentacao->origem = "movimentação inicial";
            $movimentacao->doador_id = $doador->id;
            $movimentacao->saldo = 0;
            $movimentacao->save();

            return response()->json([
                'email' => $request->cpf,
                'senha' => $request->cpf,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            \Log::error($e->getMessage());
            return response()->json(['message' => 'Registration failed'], 500);
        }
    }


    public function login(Request $request)
    {
        try {

            $request->validate([
                'email' => 'required',
                'password' => 'required',
            ]);

            if (!$token = JWTAuth::attempt($request->only('email', 'password'))) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }


            $user = JWTAuth::user();

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'banco_de_alimento_id' => $user->banco_de_alimento_id,
                'tipo' => $user->tipo,
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Login failed'], 500);
        }
    }
}
