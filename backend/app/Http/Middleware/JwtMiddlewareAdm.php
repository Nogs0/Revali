<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddlewareAdm
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
            // Autentica o usuário através do token JWT
            $user = JWTAuth::parseToken()->authenticate();

            // Verifica o tipo de usuário
            if (!$tipo = $user->tipo) {
                throw new AuthorizationException("Usuário não autorizado para este conteúdo");
            }

          
            if ($tipo != 0) {
                throw new AuthorizationException("Usuário não autorizado para este conteúdo");
            }
        } catch (AuthorizationException $e) {
            throw $e;
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                throw new AuthorizationException('Token é inválido');
            } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                throw new AuthorizationException('Token está expirado');
            } else {
                throw new AuthorizationException('Token de autorização não encontrado');
            }
        }

        return $next($request);
    }
}
