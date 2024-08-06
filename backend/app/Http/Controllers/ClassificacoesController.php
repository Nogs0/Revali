<?php

namespace App\Http\Controllers;

use App\Models\Classificacoes;
use Illuminate\Http\Request;

class ClassificacoesController extends Controller
{
    public function index()
    {
        return Classificacoes::all();
    }

    public function store(Request $request)
    {
        $classificacao = Classificacoes::create($request->all());
        return response()->json($classificacao, 201);
    }

    public function show($id)
    {
        return Classificacoes::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $classificacao = Classificacoes::find($id);
        
        $classificacao->fill($request->all());
        $classificacao->save();

        return response()->json($classificacao, 200);
    }

    public function destroy($id)
    {
        Classificacoes::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
