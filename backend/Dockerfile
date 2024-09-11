# Usa a imagem PHP 7.3 CLI
FROM php:7.3-cli

# Instala as dependências necessárias
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    git \
    curl

# Instala e configura a extensão GD
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/freetype2 --with-jpeg-dir=/usr/include && \
    docker-php-ext-install gd zip pdo pdo_mysql

# Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define o diretório de trabalho
WORKDIR /var/www/html

# Copia os arquivos da aplicação Laravel para dentro do contêiner
COPY . .

# Ajusta as permissões
RUN chown -R www-data:www-data /var/www/html

# Instala as dependências do Laravel usando o Composer
RUN composer install --no-dev --optimize-autoloader

# Ajusta as permissões de cache e armazenamento
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Expõe a porta 8000 (padrão do php artisan serve)
EXPOSE 80

# Inicia o servidor embutido do PHP para rodar a aplicação Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
