#!/bin/bash

echo -n "¿Cómo te llamas? "
read nombre

if [ "$nombre" = "Jason" ]; then
    echo "¡Hola Master Jason!"
else
    echo "¡Hola, $nombre!"
fi