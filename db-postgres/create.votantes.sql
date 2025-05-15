-- Table: eurovision.votantes

-- DROP TABLE IF EXISTS eurovision.votantes;

CREATE TABLE IF NOT EXISTS eurovision.votantes
(
    "idVotante" integer NOT NULL DEFAULT nextval('eurovision."votantes_idVotante_seq"'::regclass),
    nombre character varying(50) COLLATE pg_catalog."default",
    email character varying(20) COLLATE pg_catalog."default",
    ip_address character varying(15) COLLATE pg_catalog."default",
    "codigoPais" character(3) COLLATE pg_catalog."default",
    CONSTRAINT votantes_pkey PRIMARY KEY ("idVotante"),
    CONSTRAINT restringir_email UNIQUE NULLS NOT DISTINCT (email),
    CONSTRAINT "fk_codePais" FOREIGN KEY ("codigoPais")
        REFERENCES eurovision.paises (code_pais) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS eurovision.votantes
    OWNER to postgres;