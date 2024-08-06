<?php

namespace App\Http\Controllers;

use App\Models\Doadores;
use Illuminate\Http\Request;

class DoadoresController extends Controller
{
    public function index()
    {
        return Doadores::all();
    }

    public function store(Request $request)
    {
        $doador = Doadores::create($request->all());
        return response()->json($doador, 201);
    }

    public function show($id)
    {
        return Doadores::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $doador = Doadores::find($id);
        
        $doador->fill($request->all());
        $doador->save();

        return response()->json($doador, 200);
    }

    public function destroy($id)
    {
        Doadores::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
