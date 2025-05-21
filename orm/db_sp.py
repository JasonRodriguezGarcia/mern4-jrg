from sqlalchemy import text
from db_pg import get_session

def insert_update_socio_checking_email(id_socio, nombre, correo):
    session = get_session()
    try:
        session.execute(
            # text("CALL biblioteca.upsert_libro(:id_libro, :titulo, :autor)"),
            # {"id_libro": id_libro, "titulo": titulo, "autor": autor}
            # CALL biblioteca.insert_update_socio_checking_email(21, 'Botones Sacarino', 'botones@gmail.com')
            text("CALL biblioteca.insert_update_socio_checking_email(:id_socio, :nombre, :correo)"),
            {"id_socio": id_socio, "nombre": nombre, "correo": correo}
        )
        session.commit()  # Important: commit the transaction
        print("Upsert executed successfully.")
    except Exception as e:
        session.rollback()
        print(f"Error: {e}")
    finally:
        session.close()


if __name__ == '__main__':
    # upsert_libro(1, 'Cien años !!!!!', 'Gabriel García Márquez')
    insert_update_socio_checking_email(21, 'Manuel Perez', 'manuel@nazaret.eus')



# '''

# CREATE OR REPLACE PROCEDURE biblioteca.upsert_libro(
#     p_id_libro integer,
#     p_titulo text,
#     p_autor text
# )
# LANGUAGE plpgsql AS $$
# BEGIN
#     INSERT INTO biblioteca.libros (id_libro, titulo, autor)
#     VALUES (p_id_libro, p_titulo, p_autor)
#     ON CONFLICT (id_libro) DO UPDATE
#     SET titulo = EXCLUDED.titulo,
#         autor = EXCLUDED.autor;
# END;
# $$;

# '''