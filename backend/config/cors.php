<?php

return [

    'paths' => ['api/*'], // Permitir CORS nas rotas que começam com /api
    'allowed_methods' => ['*'], // Permitir todos os métodos (GET, POST, PUT, DELETE, etc.)
    'allowed_origins' => ['*'], // Permitir requisições de qualquer origem (você pode especificar um domínio específico)
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // Permitir todos os tipos de cabeçalhos
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,

];
