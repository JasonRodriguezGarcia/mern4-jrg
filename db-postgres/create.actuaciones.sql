-- Table: eurovision.actuaciones

-- DROP TABLE IF EXISTS eurovision.actuaciones;

CREATE TABLE IF NOT EXISTS eurovision.actuaciones
(
    nombre_artista character varying(50) COLLATE pg_catalog."default",
    code_pais character(3) COLLATE pg_catalog."default",
    titulo_cancion character varying(50) COLLATE pg_catalog."default",
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    CONSTRAINT actuaciones_pkey PRIMARY KEY (id),
    CONSTRAINT "fk_codigoPais" FOREIGN KEY (code_pais)
        REFERENCES eurovision.paises (code_pais) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS eurovision.actuaciones
    OWNER to postgres;