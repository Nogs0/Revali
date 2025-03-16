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

Route::get('/test', function () {
    echo 'Funcionando!';
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Empresas Parceiras
Route::get('/empresas-parceiras-ranking', 'App\Http\Controllers\EmpresasParceirasController@index_ranking');

// Doador Ranking
Route::get('/doador-ranking', 'App\Http\Controllers\DoadoresController@index_ranking');
/// Users route  
Route::put('/users/{id}', 'App\Http\Controllers\UsersController@update');
Route::get('/users', 'App\Http\Controllers\UsersController@index');
Route::post('/users', 'App\Http\Controllers\UsersController@store');
Route::delete('/users/{id}', 'App\Http\Controllers\UsersController@destroy');

// Banco de Alimento routes
Route::get('/bancos-de-alimentos/{id}', 'App\Http\Controllers\BancosDeAlimentosController@show');
Route::post('/bancos-de-alimentos', 'App\Http\Controllers\BancosDeAlimentosController@store');
Route::post('/bancos-de-alimentos-com-usuario', 'App\Http\Controllers\BancosDeAlimentosController@storeBancoWithUser');
Route::put('/bancos-de-alimentos/{id}', 'App\Http\Controllers\BancosDeAlimentosController@update');
Route::delete('/bancos-de-alimentos/{id}', 'App\Http\Controllers\BancosDeAlimentosController@destroy');

// Doador routes
Route::get('/doadores', 'App\Http\Controllers\DoadoresController@index');
Route::get('/doadores/{id}', 'App\Http\Controllers\DoadoresController@show');

Route::post('/doadores', 'App\Http\Controllers\DoadoresController@store');
Route::put('/doadores/{id}', 'App\Http\Controllers\DoadoresController@update');
Route::delete('/doadores/{id}', 'App\Http\Controllers\DoadoresController@destroy');

// Produto routes
Route::post('/produtos', 'App\Http\Controllers\ProdutosController@store');
Route::delete('/produtos/{id}', 'App\Http\Controllers\ProdutosController@destroy');

// Doacoes routes
Route::get('/doacoes', 'App\Http\Controllers\DoacoesController@index');
Route::get('/doacoes-em-andamento', 'App\Http\Controllers\DoacoesController@index_em_andamento');
Route::get('/doacoes-itens/{id}', 'App\Http\Controllers\DoacoesController@show_itens_doacao');
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
Route::post('/salvar-resgate', 'App\Http\Controllers\ItensResgateController@store_array_resgates');

// ProdutosResgate routes
Route::get('/produtos-resgate', 'App\Http\Controllers\ProdutosResgateController@index');
Route::get('/produtos-resgate-estoque', 'App\Http\Controllers\ProdutosResgateController@index_em_estoque');
Route::put('/produtos-resgate/{id}', 'App\Http\Controllers\ProdutosResgateController@update');
Route::delete('/produtos-resgate/{id}', 'App\Http\Controllers\ProdutosResgateController@destroy');

// Classificacao routes    
Route::get('/classificacoes/{id}', 'App\Http\Controllers\ClassificacoesController@show');
Route::post('/classificacoes', 'App\Http\Controllers\ClassificacoesController@store');
Route::put('/classificacoes/{id}', 'App\Http\Controllers\ClassificacoesController@update');
Route::delete('/classificacoes/{id}', 'App\Http\Controllers\ClassificacoesController@destroy');

// Notificações routes
Route::get('/notificacoes', 'App\Http\Controllers\NotificacoesController@index');
Route::get('/notificacoes/{id}', 'App\Http\Controllers\NotificacoesController@show');
Route::post('/notificacoes', 'App\Http\Controllers\NotificacoesController@store');
Route::put('/notificacoes/{id}', 'App\Http\Controllers\NotificacoesController@update');
Route::delete('/notificacoes/{id}', 'App\Http\Controllers\NotificacoesController@destroy');


// Movimentações routes
Route::get('/movimentacoes', 'App\Http\Controllers\MovimentacoesController@index');
Route::get('/movimentacoes/{id}', 'App\Http\Controllers\MovimentacoesController@show');
Route::post('/movimentacoes', 'App\Http\Controllers\MovimentacoesController@store');
Route::put('/movimentacoes/{id}', 'App\Http\Controllers\MovimentacoesController@update');
Route::delete('/movimentacoes/{id}', 'App\Http\Controllers\MovimentacoesController@destroy');

//empresas parceiras routes
Route::get('/empresas-parceiras', 'App\Http\Controllers\EmpresasParceirasController@index');
Route::get('/empresas-parciras-ranking', 'App\Http\Controllers\EmpresasParceirasController@index_ranking');
Route::get('/empresas-parceiras/{id}', 'App\Http\Controllers\EmpresasParceirasController@show');
Route::put('/empresas-parceiras/{id}', 'App\Http\Controllers\EmpresasParceirasController@update');
Route::delete('/empresas-parceiras/{id}', 'App\Http\Controllers\EmpresasParceirasController@destroy');


// Noticias routes
Route::get('/noticias', 'App\Http\Controllers\NoticiasController@index');
Route::get('/noticias/{id}', 'App\Http\Controllers\NoticiasController@show');
Route::post('/noticias', 'App\Http\Controllers\NoticiasController@store');
Route::put('/noticias/{id}', 'App\Http\Controllers\NoticiasController@update');
Route::delete('/noticias/{id}', 'App\Http\Controllers\NoticiasController@destroy');

// Cotação Pontos routes
Route::get('/cotacao-pontos', 'App\Http\Controllers\CotacaoPontosController@index');
Route::put('/cotacao-pontos/{id}', 'App\Http\Controllers\CotacaoPontosController@update');
Route::post('/cotacao-pontos', 'App\Http\Controllers\CotacaoPontosController@store');

// Cotação Pontos itens resgate routes
Route::get('/cotacao-pontos-itens-resgate', 'App\Http\Controllers\CotacaoPontosItensResgateController@index');
Route::put('/cotacao-pontos-itens-resgate/{id}', 'App\Http\Controllers\CotacaoPontosItensResgateController@update');
Route::post('/cotacao-pontos-itens-resgate', 'App\Http\Controllers\CotacaoPontosItensResgateController@store');

//Dashboard
Route::get('/quantidade-doacoes-por-banco', 'App\Http\Controllers\DashboardController@getQuantidadeDeDoacoesPorBanco');
Route::get('/quantidade-produtos-por-banco', 'App\Http\Controllers\DashboardController@getQuantidadeDeProdutosPorBanco');
Route::get('/quantidade-resgates-por-banco', 'App\Http\Controllers\DashboardController@getQuantidadeDeResgatesPorBanco');

route::group(['middleware' => ['doador.jwt']], function () {

    // Movimentações
    Route::get('/movimentacoes-extrato/{id}', 'App\Http\Controllers\MovimentacoesController@show_extrato');
    Route::get('/movimentacoes-extrato-detalhado/{id_movimentacao}', 'App\Http\Controllers\MovimentacoesController@show_extrato_detalhado');

    // Produtos Resgate
    Route::get('/produtos-resgate/{id}', 'App\Http\Controllers\ProdutosResgateController@show');
    Route::post('/salvar-resgate', 'App\Http\Controllers\ItensResgateController@store_array_resgates');

    // Doações em Andamento
    Route::get('/doacoes-em-andamento-user', 'App\Http\Controllers\DoacoesController@index_em_andamento_user_logado');

    // Produtos Resgate Filtro
    Route::post('/produtos-resgate-filtro', 'App\Http\Controllers\ProdutosResgateController@filtro');

    // Doador Dados
    Route::get('/doador-dados', 'App\Http\Controllers\DoadoresController@doador_logado');
});

Route::group(['middleware' => ['adm_banco.jwt']], function () {
    // Users

    Route::get('/users/{id}', 'App\Http\Controllers\UsersController@show');
    Route::get('/user-logado', 'App\Http\Controllers\UsersController@user_logado');


    // Bancos de Alimentos
    Route::get('/bancos-de-alimentos', 'App\Http\Controllers\BancosDeAlimentosController@index');

    // Classificações
    Route::get('/classificacoes', 'App\Http\Controllers\ClassificacoesController@index');

    // Empresas Parceiras
    Route::post('/empresas-parceiras', 'App\Http\Controllers\EmpresasParceirasController@store');

    // Produtos
    Route::get('/produtos/{id}', 'App\Http\Controllers\ProdutosController@show');
    Route::put('/produtos/{id}', 'App\Http\Controllers\ProdutosController@update');

    // Produtos Resgate
    Route::post('/produtos-resgate', 'App\Http\Controllers\ProdutosResgateController@store');


    // Doações
    Route::post('/doacoes-filtro-data', 'App\Http\Controllers\DoacoesController@filtro_data');
    Route::post('/doacoes-mudar-status', 'App\Http\Controllers\DoacoesController@mudar_status');
});

// Rotas fora dos grupos de middleware
Route::get('/produtos', 'App\Http\Controllers\ProdutosController@index');
Route::put('/produto-resgate-adicionar/{id}', 'App\Http\Controllers\ProdutosResgateController@adicionarProduto');

Route::post('/itens-resgate-mudar-status', 'App\Http\Controllers\ItensResgateController@mudar_status');
Route::post('/itens-resgate-nao-resgatados', 'App\Http\Controllers\ItensResgateController@filtro_nao_resgatados');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register-doador', [AuthController::class, 'register_doador']);
Route::post('/exportar-doacao', 'App\Http\Controllers\DoacoesController@exportarDoacao');
