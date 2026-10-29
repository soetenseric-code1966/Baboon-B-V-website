-- Datawerf lab: inloggen met een link per e-mail (besluit 29-10-2026).
-- lab.toegang: extra geheime links per idee (alleen de hash). lab.mails: verstuurde mails, voor de limiet per adres.
CREATE TABLE IF NOT EXISTS lab.toegang (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  idee_id       uuid NOT NULL REFERENCES lab.ideeen(id) ON DELETE CASCADE,
  sleutel_hash  text NOT NULL,
  aangemaakt    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS toegang_idee ON lab.toegang (idee_id);

CREATE TABLE IF NOT EXISTS lab.mails (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email         text NOT NULL,
  soort         text NOT NULL CHECK (soort IN ('klaar', 'links')),
  idee_id       uuid REFERENCES lab.ideeen(id) ON DELETE SET NULL,
  gelukt        boolean NOT NULL DEFAULT false,
  aangemaakt    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS mails_email ON lab.mails (email, aangemaakt);

ALTER TABLE lab.toegang ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab.mails ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON lab.toegang, lab.mails FROM PUBLIC, anon, authenticated;
GRANT ALL ON lab.toegang, lab.mails TO service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA lab TO service_role;
