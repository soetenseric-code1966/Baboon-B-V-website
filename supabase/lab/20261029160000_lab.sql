-- Datawerf lab (besluit 29-10-2026): "Start gratis met uw idee" op datawerf.com.
-- Draait tijdelijk in het Supabase-project Aardappelmonitor (geen extra kosten), in een eigen schema `lab`,
-- volledig gescheiden van de monitor. Bezoekers (anon/authenticated) hebben GEEN toegang tot dit schema;
-- alleen de Edge Function `lab` (service role) leest en schrijft. Idempotent.

CREATE SCHEMA IF NOT EXISTS lab;
REVOKE ALL ON SCHEMA lab FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA lab TO service_role;

CREATE TABLE IF NOT EXISTS lab.ideeen (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aangemaakt    timestamptz NOT NULL DEFAULT now(),
  sleutel_hash  text NOT NULL,                       -- sha-256 van de geheime link; de sleutel zelf wordt niet bewaard
  naam          text NOT NULL CHECK (char_length(btrim(naam)) BETWEEN 1 AND 120),
  email         text NOT NULL CHECK (char_length(email) <= 200 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  bedrijf       text CHECK (bedrijf IS NULL OR char_length(bedrijf) <= 160),
  idee          text NOT NULL CHECK (char_length(btrim(idee)) BETWEEN 10 AND 4000),
  titel         text CHECK (titel IS NULL OR char_length(titel) <= 80),
  taal          text NOT NULL DEFAULT 'nl' CHECK (taal IN ('nl', 'en')),
  status        text NOT NULL DEFAULT 'actief' CHECK (status IN ('actief', 'tegoed op', 'start platform', 'spam', 'gearchiveerd')),
  ip_hash       text
);

CREATE TABLE IF NOT EXISTS lab.prompts (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  idee_id       uuid NOT NULL REFERENCES lab.ideeen(id) ON DELETE CASCADE,
  nr            int NOT NULL CHECK (nr BETWEEN 1 AND 10),
  aangemaakt    timestamptz NOT NULL DEFAULT now(),
  klaar         timestamptz,
  tekst         text NOT NULL CHECK (char_length(tekst) BETWEEN 1 AND 4000),
  status        text NOT NULL DEFAULT 'bezig' CHECK (status IN ('bezig', 'klaar', 'fout')),
  html          text,
  samenvatting  text,
  model         text,
  tokens_in     int,
  tokens_uit    int,
  kosten_eur    numeric(10, 4),
  duur_ms       int,
  fout          text,
  UNIQUE (idee_id, nr)
);
CREATE INDEX IF NOT EXISTS prompts_aangemaakt ON lab.prompts (aangemaakt);
CREATE INDEX IF NOT EXISTS ideeen_aangemaakt ON lab.ideeen (aangemaakt);

ALTER TABLE lab.ideeen ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab.prompts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON ALL TABLES IN SCHEMA lab FROM PUBLIC, anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA lab TO service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA lab TO service_role;
-- Geen policies voor anon/authenticated: zonder policy en zonder rechten is er geen toegang.
