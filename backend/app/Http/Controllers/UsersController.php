<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;

class UsersController extends Controller
{
    /**
     * Display a listing of the users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $users = Users::all();
            return response()->json($users);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve users'], 500);
        }
    }

    public function user_logado()
    {
        try {
        
            $user = JWTAuth::parseToken()->authenticate();
    
            if (!$user) {
                return response()->json(['message' => 'Usuário não encontrado'], 404);
            }
    

            $user->makeHidden(['password', 'remember_token']);
    
    
            return response()->json([
                'user' => $user,
            ], 200);
        } catch (Exception $e) {
            \Log::error("Erro ao buscar usuário logado: " . $e->getMessage());
            return response()->json(['message' => 'Falha ao buscar usuário logado'], 500);
        }
    }

    /**
     * Store a newly created user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $user = new Users;
            $user->fill($request->all());

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
                $user->pastaDeFotos = $imgurLink;

            } else {
                $url = 'https://via.placeholder.com/150';
                $user->pastaDeFotos = $url;
            }
            $user->save();

            return response()->json($user, 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to create user'], 500);
        }
    }

    /**
     * Display the specified user.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $user = Users::findOrFail($id);
            return response()->json($user);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'User not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve user'], 500);
        }
    }

    /**
     * Update the specified user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $user = Users::findOrFail($id);

            $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
                'password' => 'sometimes|required|string|min:8|confirmed',
                // Adicione outras regras de validação conforme necessário
            ]);

            $user->fill($request->all());

            if ($request->has('password')) {
                $user->password = bcrypt($request->password);
            }

            $user->save();

            return response()->json($user, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'User not found'], 404);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to update user'], 500);
        }
    }

    /**
     * Remove the specified user from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $user = Users::findOrFail($id);
            $user->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'User not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to delete user'], 500);
        }
    }
}
