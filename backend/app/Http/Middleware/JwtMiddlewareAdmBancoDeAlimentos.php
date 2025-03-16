<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddlewareAdmBancoDeAlimentos
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
           
            $user = JWTAuth::parseToken()->authenticate();
          
            if (!isset($user->tipo)) {
                throw new AuthorizationException("Tipo de usuário não encontrado");
            }

            if ($user->tipo != 0 && $user->tipo != 1) {
                throw new AuthorizationException("Usuário não autorizado para este conteúdo");
            }

        } catch (AuthorizationException $e) {
            throw $e;
        } catch (Exception $e) {
            // Lida com diferentes exceções relacionadas ao token JWT
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                throw new AuthorizationException('Token é inválido');
            } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                throw new AuthorizationException('Token está expirado');
            } else {
                throw new AuthorizationException('Token de autorização não encontrado');
            }
        }

        // Permite que a requisição continue
        return $next($request);
    }
}
