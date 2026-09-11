# Legg til jobbsøker

Samlet funksjonalitet for å legge til jobbsøkere/kandidater via fødselsnummer-søk.
All relatert kode ligger i denne mappen for å holde oversikt.

## Komponenter

| Fil                              | Ansvar                                                                                                               |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `LeggTilJobbsøker.tsx`           | Inngang: kort (`LenkeKortMedIkon`) som åpner en `Dialog`. Tar `type` og rendrer `LeggTilDialog`.                     |
| `LeggTilJobbsøkerMeny.tsx`       | Delt `ActionMenu`-dropdown med «Finn jobbsøker» (navigerer) og «Legg til via fødselsnummer» (åpner `LeggTilDialog`). |
| `LeggTilDialog.tsx`              | Felles dialoginnhold. Brancher på `type` (switch) for tittel og lagringslogikk.                                      |
| `FinnJobbsøkereKnapp.tsx`        | Egen inngang (lenke) til kandidatsøk for stilling/rekrutteringstreff.                                                |
| `legg-til/LeggTilKandidater.tsx` | Delt byggekloss: søk på fødselsnummer, velg kandidater, callback med valgte.                                         |
| `synlighet/*`                    | Forklaring på hvorfor en jobbsøker ikke er synlig (`SynlighetsModal`, `Synlighetsinfo`, `SynlighetsEvaluering`).     |

## Typer og atferd (`LeggTilJobbsøkerType`)

- **Stilling** – synlige legges i kandidatlisten (`leggTilKandidater`); usynlige kan
  registreres som «fått jobben» via `formidleUsynligKandidat`.
- **Etterregistrering** (stilling med `erFormidling`) – alle formidles via
  `formidleUsynligKandidat`.
- **Rekrutteringstreff** – legges til via `opprettJobbsøkere`. Usynlige jobbsøkere
  kan **ikke** legges til; det vises en informasjonstekst i stedet for «fått jobben».

## Hvor brukes det

### `LeggTilJobbsøker` (kort + dialog)

- Stilling: `app/stilling/[stillingsId]/_ui/KandidatKnapper.tsx` (`type=Stilling`).
- Rekrutteringstreff: `app/rekrutteringstreff/[rekrutteringstreffId]/_ui/omTreffet/OmTreffetForEier.tsx` (`type=Rekrutteringstreff`).

### `LeggTilJobbsøkerMeny` (dropdown i jobbsøker-/kandidatlister)

- Stilling: `app/stilling/[stillingsId]/kandidatliste/_ui/KandidatlisteHandlingsRad.tsx`.
- Rekrutteringstreff: `app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/LeggTilJobbsøkerKnapp.tsx`
  (wrapper som setter treff-spesifikk låsing/tooltip).

### `LeggTilKandidater` (delt byggekloss)

- Via `LeggTilDialog` for alle innganger over.
- Direkte i `app/stilling/_ui/stilling-admin/admin_moduler/FormidleKandidater.tsx`
  (kandidater-modul ved opprett/rediger av etterregistrering). Bruker `tilFormidling`
  og `synlighetSomModal`, uten `type`.

### `FinnJobbsøkereKnapp`

- Stilling: `KandidatKnapper.tsx`.
- Rekrutteringstreff: `OmTreffetForEier.tsx` og `OmTreffetForIkkeEier.tsx`.

## Datalag

- `app/api/synlighet/evaluering/useSynlighetsevaluering.ts` – synlighetsevaluering (også
  brukt av `app/personbruker/InngangFraArbop.tsx`).
- `app/api/kandidat-sok/useKandidatNavn.ts`, `useArenaKandidatnr.ts` – oppslag på fødselsnummer.
- `app/api/rekrutteringstreff/[...slug]/jobbsøkere/mutations.ts` – `opprettJobbsøkere`.

## Playwright-tester

- `tests/stilling/vis-stilling/legg-til-kandidat.spec.ts` – fnr-dialog for stilling.
- `tests/rekrutteringstreff/legg-til-jobbsoker-dialog.spec.ts` – fnr-dialog for rekrutteringstreff.
- `tests/formidling/formidle-kandidater.spec.ts` – `LeggTilKandidater` i etterregistrering.
