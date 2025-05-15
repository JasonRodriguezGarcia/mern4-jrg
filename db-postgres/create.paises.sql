-- Table: eurovision.paises

-- DROP TABLE IF EXISTS eurovision.paises;

CREATE TABLE IF NOT EXISTS eurovision.paises
(
    pais character varying(50) COLLATE pg_catalog."default",
    code_pais character(3) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT paises_pkey PRIMARY KEY (code_pais)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS eurovision.paises
    OWNER to postgres;