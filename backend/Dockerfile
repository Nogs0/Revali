# Usa a imagem PHP 7.3 com Apache
FROM php:7.3-apache

# Atualiza e instala pacotes necessários
RUN apt-get update && \
    apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    git

# Instala e configura a extensão GD
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/freetype2 --with-jpeg-dir=/usr/include && \
    docker-php-ext-install gd zip

# Instala a extensão PDO MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define o diretório de trabalho
WORKDIR /var/www/html

# Copia o código da aplicação
COPY . .

# Ajusta permissões
RUN chown -R www-data:www-data /var/www/html

# Instala dependências do Laravel
RUN composer install

# Expõe a porta 80
EXPOSE 80

# Define o comando para iniciar a aplicação
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
