<?php

namespace App\Http\Controllers;

use App\Models\Doadores;
use App\Models\Movimentacoes;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password as PasswordRule;
use Exception;
use Illuminate\Validation\ValidationException;
use Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => ['required', 'confirmed', PasswordRule::defaults()],
                'pastaDeFotos' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048' // Validating image
            ]);
    
            // Default image URL
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
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'tipo' => 0,
                'pastaDeFotos' => $imageUrl, // Ensure this field is set
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
    
            $token = JWTAuth::fromUser($user);
    
            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 201);
    
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            \Log::error("Registration Error: " . $e->getMessage());
            return response()->json(['message' => 'Registration failed', 'error' => $e->getMessage()], 500);
        }
    }

    public function register_doador(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
            ]);
            $password = Str::random(8);

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
                'email' => $request->email,
                'cpf'=> $request->cpf,
                'password' => Hash::make($password),
                'pastaDeFotos' => $imageUrl,
                'tipo' => 2,
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
                'email' => $request->email,
                'senha' => $password,
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
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if (!$token = JWTAuth::attempt($request->only('email', 'password'))) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Login failed'], 500);
        }
    }

    public function forgotPassword(Request $request)
    {
        try {
            $request->validate(['email' => 'required|email']);

            $status = Password::sendResetLink($request->only('email'));

            if ($status === Password::RESET_LINK_SENT) {
                return response()->json(['message' => __($status)]);
            }

            return response()->json(['message' => __($status)], 400);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to send reset link'], 500);
        }
    }

    public function resetPassword(Request $request)
    {
        try {
            $request->validate([
                'token' => 'required',
                'email' => 'required|email',
                'password' => ['required', 'confirmed', PasswordRule::defaults()],
            ]);

            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function (Users $user, string $password) {
                    $user->forceFill([
                        'password' => Hash::make($password),
                    ])->save();
                }
            );

            if ($status === Password::PASSWORD_RESET) {
                return response()->json(['message' => __($status)]);
            }

            return response()->json(['message' => __($status)], 400);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to reset password'], 500);
        }
    }
}
