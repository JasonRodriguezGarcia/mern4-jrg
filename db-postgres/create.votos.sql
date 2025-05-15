-- Table: eurovision.votos

-- DROP TABLE IF EXISTS eurovision.votos;

CREATE TABLE IF NOT EXISTS eurovision.votos
(
    "idVotante" integer NOT NULL,
    "idActuacion" integer NOT NULL,
    "fechaVoto" date,
    voto numeric(3,1),
    CONSTRAINT votos_pkey PRIMARY KEY ("idVotante", "idActuacion"),
    CONSTRAINT "fk_idActuacion" FOREIGN KEY ("idActuacion")
        REFERENCES eurovision.actuaciones (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "fk_idVotante" FOREIGN KEY ("idVotante")
        REFERENCES eurovision.votantes ("idVotante") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "comprobarVoto" CHECK (voto >= 1::numeric AND voto <= 12::numeric) NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS eurovision.votos
    OWNER to postgres;