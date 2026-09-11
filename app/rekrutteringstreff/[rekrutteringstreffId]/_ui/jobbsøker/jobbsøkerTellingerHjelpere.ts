import { JobbsøkerHendelsestype } from '@/app/rekrutteringstreff/_types/constants';

/**
 * Utleder jobbsøkertellinger ved å folde hendelsesloggen per person, i stedet for å
 * lese `status`-kolonna. Bakgrunnen er at `status` bare har plass til én verdi om
 * gangen: både `MØTT_OPP` og `FÅTT_JOBB` overskriver `SVART_JA`, slik at et svar som
 * fortsatt står i hendelsesloggen forsvinner fra tellingene.
 *
 * Her holdes svar, oppmøte og formidling på hver sin akse. En jobbsøker kan derfor
 * være både «svart ja» og «møtt opp» samtidig, som er det som faktisk har skjedd.
 */

export const Svarstatus = {
  UBESVART: 'UBESVART',
  SVART_JA: 'SVART_JA',
  SVART_NEI: 'SVART_NEI',
} as const;
export type Svarstatus = (typeof Svarstatus)[keyof typeof Svarstatus];

/**
 * Hendelsene som flytter en jobbsøker langs svaraksen. Siste hendelse vinner, så et
 * svar som trekkes tilbake håndteres av `SVAR_FJERNET_AV_EIER` uten at noe trekkes fra.
 * En ny invitasjon nullstiller også svaret.
 *
 * Bevisst utelatt: `SVART_JA_TREFF_AVLYST` og `SVART_JA_TREFF_FULLFØRT` er øyeblikksbilder
 * som skrives når treffet avsluttes, ikke svar avgitt av jobbsøkeren. De telles for seg.
 */
const svarOverganger: Partial<Record<JobbsøkerHendelsestype, Svarstatus>> = {
  [JobbsøkerHendelsestype.INVITERT]: Svarstatus.UBESVART,
  [JobbsøkerHendelsestype.SVAR_FJERNET_AV_EIER]: Svarstatus.UBESVART,
  [JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON]: Svarstatus.SVART_JA,
  [JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON_AV_EIER]: Svarstatus.SVART_JA,
  [JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON]: Svarstatus.SVART_NEI,
  [JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON_AV_EIER]:
    Svarstatus.SVART_NEI,
};

/** Minste felt folden trenger. Gjør funksjonen testbar uten å bygge hele hendelses-DTO-en. */
export interface TellbarJobbsøkerHendelse {
  personTreffId: string;
  hendelsestype: JobbsøkerHendelsestype;
  tidspunkt: string;
}

export interface Jobbsøkertilstand {
  personTreffId: string;
  lagtTil: boolean;
  invitert: boolean;
  svar: Svarstatus;
  møttOpp: boolean;
  fåttJobb: boolean;
  slettet: boolean;
  svartJaTreffAvlyst: boolean;
  svartJaTreffFullført: boolean;
}

const tomTilstand = (personTreffId: string): Jobbsøkertilstand => ({
  personTreffId,
  lagtTil: false,
  invitert: false,
  svar: Svarstatus.UBESVART,
  møttOpp: false,
  fåttJobb: false,
  slettet: false,
  svartJaTreffAvlyst: false,
  svartJaTreffFullført: false,
});

/**
 * Folder hendelsene ned til én tilstand per jobbsøker.
 *
 * Sorterer kronologisk først, slik at resultatet ikke avhenger av rekkefølgen kallstedet
 * sender inn. API-et leverer nyeste først, mens folden trenger eldste først.
 */
export const utledJobbsøkertilstander = (
  hendelser: readonly TellbarJobbsøkerHendelse[],
): Jobbsøkertilstand[] => {
  const kronologisk = [...hendelser].sort(
    (a, b) => new Date(a.tidspunkt).getTime() - new Date(b.tidspunkt).getTime(),
  );

  const perPerson = new Map<string, Jobbsøkertilstand>();

  for (const hendelse of kronologisk) {
    const tilstand =
      perPerson.get(hendelse.personTreffId) ??
      tomTilstand(hendelse.personTreffId);

    const nyttSvar = svarOverganger[hendelse.hendelsestype];
    if (nyttSvar !== undefined) tilstand.svar = nyttSvar;

    switch (hendelse.hendelsestype) {
      case JobbsøkerHendelsestype.OPPRETTET:
        tilstand.lagtTil = true;
        break;
      case JobbsøkerHendelsestype.INVITERT:
        tilstand.invitert = true;
        break;
      case JobbsøkerHendelsestype.SLETTET:
        tilstand.slettet = true;
        break;
      case JobbsøkerHendelsestype.REGISTRERT_OPPMØTE:
        tilstand.møttOpp = true;
        break;
      case JobbsøkerHendelsestype.REGISTRERT_OPPMØTE_FJERNET:
        tilstand.møttOpp = false;
        break;
      case JobbsøkerHendelsestype.FÅTT_JOBB:
        tilstand.fåttJobb = true;
        break;
      case JobbsøkerHendelsestype.ANGRE_FÅTT_JOBB:
        tilstand.fåttJobb = false;
        break;
      case JobbsøkerHendelsestype.SVART_JA_TREFF_AVLYST:
        tilstand.svartJaTreffAvlyst = true;
        break;
      case JobbsøkerHendelsestype.SVART_JA_TREFF_FULLFØRT:
        tilstand.svartJaTreffFullført = true;
        break;
    }

    perPerson.set(hendelse.personTreffId, tilstand);
  }

  return [...perPerson.values()];
};

export interface Jobbsøkertellinger {
  antallLagtTil: number;
  antallInviterte: number;
  antallSvarJa: number;
  antallSvarNei: number;
  antallUbesvart: number;
  antallMøttOpp: number;
  antallFåttJobb: number;
  antallTreffAvlystJa: number;
  antallTreffFullførtJa: number;
}

/**
 * Teller jobbsøkere per akse. Slettede jobbsøkere holdes utenfor alt, slik at tallene
 * matcher `jobbsoker_sok_view`, som filtrerer bort `status = 'SLETTET'`.
 *
 * Merk to bevisste forskjeller fra den statusbaserte tellinga:
 *
 * 1. Tallene teller *personer*, ikke hendelser. En jobbsøker som inviteres på nytt etter
 *    at svaret er fjernet telles én gang i `antallInviterte`, ikke to.
 * 2. Aksene overlapper. Den som har svart ja og siden møtt opp telles i både
 *    `antallSvarJa` og `antallMøttOpp`. Kallsteder som skal vise gjensidig utelukkende
 *    kategorier må velge en visningsrekkefølge selv.
 */
export const tellJobbsøkere = (
  hendelser: readonly TellbarJobbsøkerHendelse[],
): Jobbsøkertellinger => {
  const aktive = utledJobbsøkertilstander(hendelser).filter((t) => !t.slettet);
  const antall = (predikat: (t: Jobbsøkertilstand) => boolean) =>
    aktive.filter(predikat).length;

  return {
    antallLagtTil: antall((t) => t.lagtTil),
    antallInviterte: antall((t) => t.invitert),
    antallSvarJa: antall((t) => t.svar === Svarstatus.SVART_JA),
    antallSvarNei: antall((t) => t.svar === Svarstatus.SVART_NEI),
    antallUbesvart: antall((t) => t.invitert && t.svar === Svarstatus.UBESVART),
    antallMøttOpp: antall((t) => t.møttOpp),
    antallFåttJobb: antall((t) => t.fåttJobb),
    antallTreffAvlystJa: antall((t) => t.svartJaTreffAvlyst),
    antallTreffFullførtJa: antall((t) => t.svartJaTreffFullført),
  };
};
