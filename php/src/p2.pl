#!/usr/bin/perl
use strict;
use warnings;

print "¿Cómo te llamas? ";
my $nombre = <STDIN>;        # Leer entrada del usuario
chomp($nombre);              # Quitar el salto de línea

print "¡Hola, $nombre!\n";