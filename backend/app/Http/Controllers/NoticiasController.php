<?php

namespace App\Http\Controllers;

use App\Models\Noticias;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

class NoticiasController extends Controller
{
    public function index()
    {
        try {
            $noticias = Noticias::all();
            return response()->json($noticias);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve records'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'pastaDeFotos' => 'required|string|max:255',
                'titulo' => 'required|string|max:255',
                'descricao' => 'required|string',
                'tela' => 'required|in:home' 
            ]);

            $noticia = Noticias::create($request->all());
            return response()->json($noticia, 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to create record'], 500);
        }
    }

    public function show($id)
    {
        try {
            $noticia = Noticias::findOrFail($id);
            return response()->json($noticia);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Record not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve record'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $noticia = Noticias::findOrFail($id);

            $request->validate([
                'pastaDeFotos' => 'string|max:255',
                'titulo' => 'string|max:255',
                'descricao' => 'string',
                'tela' => 'in:home'
            ]);

            $noticia->fill($request->all());
            $noticia->save();

            return response()->json($noticia, 200);
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
            $noticia = Noticias::findOrFail($id);
            $noticia->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Record not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to delete record'], 500);
        }
    }
}
