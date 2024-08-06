<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index()
    {
        return Users::all();
    }

    public function store(Request $request)
    {
        $usuario = Users::create($request->all());
        return response()->json($usuario, 201);
    }

    public function show($id)
    {
        return Users::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $User = Users::find($id);
        
        $User->fill($request->all());
        $User->save();

        return response()->json($User, 200);
    }

    public function destroy($id)
    {
        Users::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
