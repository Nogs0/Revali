<?php

namespace App\Http\Controllers;

use App\Models\Produtos;
use Illuminate\Http\Request;

class ProdutosController extends Controller
{
    public function index()
    {
        return Produtos::all();
    }

    public function store(Request $request)
    {
        $produto = Produtos::create($request->all());
        return response()->json($produto, 201);
    }

    public function show($id)
    {
        return Produtos::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $produto = Produtos::find($id);
        
        $produto->fill($request->all());
        $produto->save();

        return response()->json($produto, 200);
    }

    public function destroy($id)
    {
        Produtos::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
