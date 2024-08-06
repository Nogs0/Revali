<?php

namespace App\Http\Controllers;

use App\Models\Doacoes;
use Illuminate\Http\Request;

class DoacoesController extends Controller
{
    public function index()
    {
        return Doacoes::all();
    }

    public function store(Request $request)
    {
        $doacao = Doacoes::create($request->all());
        return response()->json($doacao, 201);
    }

    public function show($id)
    {
        return Doacoes::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $doacao = Doacoes::find($id);
        
        $doacao->fill($request->all());
        $doacao->save();

        return response()->json($doacao, 200);
    }

    public function destroy($id)
    {
        Doacoes::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
