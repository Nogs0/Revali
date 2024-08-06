<?php

namespace App\Http\Controllers;

use App\Models\ProdutosResgate;
use Illuminate\Http\Request;

class ProdutosResgateController extends Controller
{
    public function index()
    {
        return ProdutosResgate::all();
    }

    public function store(Request $request)
    {
        $produtoResgate = ProdutosResgate::create($request->all());
        return response()->json($produtoResgate, 201);
    }

    public function show($id)
    {
        return ProdutosResgate::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $produtoResgate = ProdutosResgate::find($id);
        
        $produtoResgate->fill($request->all());
        $produtoResgate->save();

        return response()->json($produtoResgate, 200);
    }

    public function destroy($id)
    {
        ProdutosResgate::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
