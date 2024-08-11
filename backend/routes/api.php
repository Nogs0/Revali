<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsersController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// Users routes
Route::get('/users', 'App\Http\Controllers\UsersController@index');
Route::get('/users/{id}', 'App\Http\Controllers\UsersController@show');
Route::post('/users', 'App\Http\Controllers\UsersController@store');
Route::put('/users/{id}', 'App\Http\Controllers\UsersController@update');
Route::delete('/users/{id}', 'App\Http\Controllers\UsersController@destroy');

// Banco de Alimento routes
Route::get('/bancos-de-alimentos', 'App\Http\Controllers\BancosDeAlimentosController@index');
Route::get('/bancos-de-alimentos/{id}', 'App\Http\Controllers\BancosDeAlimentosController@show');
Route::post('/bancos-de-alimentos', 'App\Http\Controllers\BancosDeAlimentosController@store');
Route::put('/bancos-de-alimentos/{id}', 'App\Http\Controllers\BancosDeAlimentosController@update');
Route::delete('/bancos-de-alimentos/{id}', 'App\Http\Controllers\BancosDeAlimentosController@destroy');

// Doador routes
Route::get('/doadores', 'App\Http\Controllers\DoadoresController@index');
Route::get('/doadores/{id}', 'App\Http\Controllers\DoadoresController@show');
Route::post('/doadores', 'App\Http\Controllers\DoadoresController@store');
Route::put('/doadores/{id}', 'App\Http\Controllers\DoadoresController@update');
Route::delete('/doadores/{id}', 'App\Http\Controllers\DoadoresController@destroy');

// Produto routes
Route::get('/produtos', 'App\Http\Controllers\ProdutosController@index');
Route::get('/produtos/{id}', 'App\Http\Controllers\ProdutosController@show');
Route::post('/produtos', 'App\Http\Controllers\ProdutosController@store');
Route::put('/produtos/{id}', 'App\Http\Controllers\ProdutosController@update');
Route::delete('/produtos/{id}', 'App\Http\Controllers\ProdutosController@destroy');

// Doacoes routes
Route::get('/doacoes', 'App\Http\Controllers\DoacoesController@index');
Route::get('/doacoes/{id}', 'App\Http\Controllers\DoacoesController@show');
Route::post('/doacoes', 'App\Http\Controllers\DoacoesController@store');
Route::put('/doacoes/{id}', 'App\Http\Controllers\DoacoesController@update');
Route::delete('/doacoes/{id}', 'App\Http\Controllers\DoacoesController@destroy');

// ItensDoacao routes
Route::get('/itens-doacao', 'App\Http\Controllers\ItensDoacaoController@index');
Route::get('/itens-doacao/{id}', 'App\Http\Controllers\ItensDoacaoController@show');
Route::post('/itens-doacao', 'App\Http\Controllers\ItensDoacaoController@store');
Route::post('/salvar-doacao', 'App\Http\Controllers\ItensDoacaoController@store_array_doacoes');
Route::put('/itens-doacao/{id}', 'App\Http\Controllers\ItensDoacaoController@update');
Route::delete('/itens-doacao/{id}', 'App\Http\Controllers\ItensDoacaoController@destroy');

// Resgate routes
Route::get('/resgates', 'App\Http\Controllers\ResgatesController@index');
Route::get('/resgates/{id}', 'App\Http\Controllers\ResgatesController@show');
Route::post('/resgates', 'App\Http\Controllers\ResgatesController@store');
Route::put('/resgates/{id}', 'App\Http\Controllers\ResgatesController@update');
Route::delete('/resgates/{id}', 'App\Http\Controllers\ResgatesController@destroy');

// ItensResgate routes
Route::get('/itens-resgate', 'App\Http\Controllers\ItensResgateController@index');
Route::get('/itens-resgate/{id}', 'App\Http\Controllers\ItensResgateController@show');
Route::post('/itens-resgate', 'App\Http\Controllers\ItensResgateController@store');
Route::put('/itens-resgate/{id}', 'App\Http\Controllers\ItensResgateController@update');
Route::delete('/itens-resgate/{id}', 'App\Http\Controllers\ItensResgateController@destroy');

// ProdutosResgate routes
Route::get('/produtos-resgate', 'App\Http\Controllers\ProdutosResgateController@index');
Route::get('/produtos-resgate/{id}', 'App\Http\Controllers\ProdutosResgateController@show');
Route::post('/produtos-resgate', 'App\Http\Controllers\ProdutosResgateController@store');
Route::put('/produtos-resgate/{id}', 'App\Http\Controllers\ProdutosResgateController@update');
Route::delete('/produtos-resgate/{id}', 'App\Http\Controllers\ProdutosResgateController@destroy');

// Classificacao routes
Route::get('/classificacoes', 'App\Http\Controllers\ClassificacoesController@index');
Route::get('/classificacoes/{id}', 'App\Http\Controllers\ClassificacoesController@show');
Route::post('/classificacoes', 'App\Http\Controllers\ClassificacoesController@store');
Route::put('/classificacoes/{id}', 'App\Http\Controllers\ClassificacoesController@update');
Route::delete('/classificacoes/{id}', 'App\Http\Controllers\ClassificacoesController@destroy');
