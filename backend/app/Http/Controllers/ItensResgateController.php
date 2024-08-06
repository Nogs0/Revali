<?php

namespace App\Http\Controllers;

use App\Models\ItensResgate;
use Illuminate\Http\Request;

class ItensResgateController extends Controller
{
    public function index()
    {
        return ItensResgate::all();
    }

    public function store(Request $request)
    {
        $itemResgate = ItensResgate::create($request->all());
        return response()->json($itemResgate, 201);
    }

    public function show($id)
    {
        return ItensResgate::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $itemResgate = ItensResgate::find($id);
        
        $itemResgate->fill($request->all());
        $itemResgate->save();

        return response()->json($itemResgate, 200);
    }

    public function destroy($id)
    {
        ItensResgate::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
