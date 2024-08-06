<?php

namespace App\Http\Controllers;

use App\Models\BancosDeAlimentos;
use Illuminate\Http\Request;

class BancosDeAlimentosController extends Controller
{
    public function index()
    {
        return BancosDeAlimentos::all();
    }

    public function store(Request $request)
    {
        $bancoDeAlimento = BancosDeAlimentos::create($request->all());
        return response()->json($bancoDeAlimento, 201);
    }

    public function show($id)
    {
        return BancosDeAlimentos::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $bancoDeAlimento = BancosDeAlimentos::find($id);
        
        $bancoDeAlimento->fill($request->all());
        $bancoDeAlimento->save();

        return response()->json($bancoDeAlimento, 200);
    }

    public function destroy($id)
    {
        BancosDeAlimentos::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
