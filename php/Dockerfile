# Use an official PHP image with Apache
FROM php:8.2-apache

# ESTUDIAR LO DEL PDO
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Set the working directory (optional, but good practice)
WORKDIR /var/www/html

# Change ownership of /var/www/html to www-data user and group
# RUN chown -R www-data:www-data /var/www/html

# docker build -t my-php .
# docker run -d -p 8080:80 -v "$(pwd)/src:/var/www/html" --name php-container my-php
# http://localhost:8080


# docker-compose up --build