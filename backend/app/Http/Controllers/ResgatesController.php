<?php

namespace App\Http\Controllers;

use App\Models\Resgates;
use Illuminate\Http\Request;

class ResgatesController extends Controller
{
    public function index()
    {
        return Resgates::all();
    }

    public function store(Request $request)
    {
        $resgate = Resgates::create($request->all());
        return response()->json($resgate, 201);
    }

    public function show($id)
    {
        return Resgates::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $resgate = Resgates::find($id);
        
        $resgate->fill($request->all());
        $resgate->save();

        return response()->json($resgate, 200);
    }

    public function destroy($id)
    {
        Resgates::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
