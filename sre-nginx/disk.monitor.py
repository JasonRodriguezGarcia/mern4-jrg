import shutil

print(shutil.disk_usage("/"))

total, free, used = shutil.disk_usage("/")

usage_perc = (used / total) * 100
print(usage_perc)


# ---------------------------------
# copiar archivos de : a
src = 'access.log'

# Destination file path
dst = 'backup/access.log'

try:
    # Copiar el archivo
    shutil.copy(src, dst)
    print("File copied successfully!")

#  error genérico, no detallado
# except Exception as e:
#     print("Error ", e)

# expecificamos el error cuando no se encuentra el fichero
except FileNotFoundError as e:
    print("Error al copiar: ", e)

except:
    print("Hola ...")

    