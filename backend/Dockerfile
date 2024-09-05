# Usar a imagem oficial do PHP com o FPM
FROM php:7.3.19-fpm

# Instalar dependências e extensões PHP necessárias
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libxml2-dev \
    libonig-dev \
    libicu-dev \
    git \
    unzip \
    && docker-php-ext-configure gd \
    && docker-php-ext-install gd pdo pdo_mysql zip \
    && docker-php-ext-enable opcache

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configuração do diretório de trabalho
WORKDIR /var/www/html

# Copiar o código da aplicação para o contêiner
COPY . .

# Expor a porta que o PHP-FPM vai usar
EXPOSE 9000

CMD ["php-fpm"]
