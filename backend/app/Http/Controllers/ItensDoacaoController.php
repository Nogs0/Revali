<?php

namespace App\Http\Controllers;

use App\Models\ItensDoacao;
use Illuminate\Http\Request;

class ItensDoacaoController extends Controller
{
    public function index()
    {
        return ItensDoacao::all();
    }

    public function store(Request $request)
    {
        $itemDoacao = ItensDoacao::create($request->all());
        return response()->json($itemDoacao, 201);
    }

    public function show($id)
    {
        return ItensDoacao::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $itemDoacao = ItensDoacao::find($id);
        
        $itemDoacao->fill($request->all());
        $itemDoacao->save();

        return response()->json($itemDoacao, 200);
    }

    public function destroy($id)
    {
        ItensDoacao::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
