import {
  PARTSETIKETT,
  finnNotat,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/notatvalg';
import {
  JobbsøkerHendelsestype,
  ArbeidsgiverHendelsestype,
  RekrutteringstreffHendelsestype,
} from '@/app/rekrutteringstreff/_types/constants';
import { BodyShort } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

interface BaseProps<T extends string> {
  icon: ReactNode;
  hendelseType: T;
  antall?: number;
  size?: 'small' | 'medium';
}

/**
 * Notatkoden bærer parten selv: `AG_` er noe arbeidsgiveren sa, `JS_` noe jobbsøkeren sa.
 * Prefikset er kilden til uttalelsen – hendelsen handler uansett om jobbsøkeren.
 */
const notatbeskrivelse = (notat: string | null | undefined): string | null => {
  if (!notat) return null;
  const treff = finnNotat(notat);
  if (!treff) return null;
  return `${PARTSETIKETT[treff.part]}: ${treff.tekst.toLowerCase()}`;
};

export const jobbsøkerLabelTekst = (t: JobbsøkerHendelsestype | string) => {
  switch (t) {
    case JobbsøkerHendelsestype.OPPRETTET:
      return 'Lagt til';
    case JobbsøkerHendelsestype.OPPDATERT:
      return 'Oppdatert';
    case JobbsøkerHendelsestype.SLETTET:
      return 'Slettet';
    case JobbsøkerHendelsestype.INVITERT:
      return 'Invitert';
    case JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON:
      return 'Svart ja';
    case JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON_AV_EIER:
      return 'Svart ja av eier';
    case JobbsøkerHendelsestype.SVAR_FJERNET_AV_EIER:
      return 'Svar fjernet av eier';
    case JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON:
      return 'Svart nei';
    case JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON_AV_EIER:
      return 'Svart nei av eier';
    case JobbsøkerHendelsestype.SVART_JA_TREFF_AVLYST:
      return 'Treff avlyst';
    case JobbsøkerHendelsestype.SVART_JA_TREFF_FULLFØRT:
      return 'Treff fullført';
    case JobbsøkerHendelsestype.AKTIVITETSKORT_OPPRETTELSE_FEIL:
      return 'Opprettelse feilet';
    case JobbsøkerHendelsestype.MOTTATT_SVAR_FRA_MINSIDE:
      return 'Mottatt svar';
    case JobbsøkerHendelsestype.TREFF_ENDRET_ETTER_PUBLISERING:
      return 'Treff endret etter publisering';
    case JobbsøkerHendelsestype.TREFF_ENDRET_ETTER_PUBLISERING_NOTIFIKASJON:
      return 'Varslet om endring av treff etter publisering';
    case JobbsøkerHendelsestype.IKKE_SVART_TREFF_FULLFØRT:
      return 'Treff fullført, person svarte ikke';
    case JobbsøkerHendelsestype.IKKE_SVART_TREFF_AVLYST:
      return 'Treff avlyst, person svarte ikke';
    case JobbsøkerHendelsestype.FÅTT_JOBB:
      return 'Fått jobb';
    case JobbsøkerHendelsestype.ANGRE_FÅTT_JOBB:
      return 'Angre fått jobb';
    case JobbsøkerHendelsestype.REGISTRERT_OPPMØTE:
      return 'Registrert oppmøte';
    case JobbsøkerHendelsestype.REGISTRERT_OPPMØTE_FJERNET:
      return 'Oppmøte fjernet';
    case JobbsøkerHendelsestype.VURDERT:
      return 'Vurdert';
    case JobbsøkerHendelsestype.NOTAT_LAGT_TIL:
      return 'Notat lagt til';
    case JobbsøkerHendelsestype.NOTAT_FJERNET:
      return 'Notat fjernet';
    case JobbsøkerHendelsestype.ANDREGANGSINTERVJU_AVTALT:
      return 'Andregangsintervju avtalt';
    case JobbsøkerHendelsestype.ANGRE_ANDREGANGSINTERVJU_AVTALT:
      return 'Andregangsintervju fjernet';
    case JobbsøkerHendelsestype.JOBBTILBUD_GITT:
      return 'Jobbtilbud gitt';
    case JobbsøkerHendelsestype.ANGRE_JOBBTILBUD_GITT:
      return 'Jobbtilbud fjernet';
    default:
      return t;
  }
};

/**
 * Utfyllende tekst under etiketten, for hendelser der hendelseData sier noe
 * current state ikke kan si – som hvilket notat det gjaldt, eller hva vurderingen var før.
 */
export const jobbsøkerDetaljtekst = (
  hendelseType: JobbsøkerHendelsestype | string,
  hendelseData: unknown,
): string | null => {
  if (hendelseData == null || typeof hendelseData !== 'object') return null;
  const data = hendelseData as Record<string, unknown>;

  switch (hendelseType) {
    case JobbsøkerHendelsestype.NOTAT_LAGT_TIL:
    case JobbsøkerHendelsestype.NOTAT_FJERNET:
      return notatbeskrivelse(
        typeof data.notat === 'string' ? data.notat : null,
      );
    case JobbsøkerHendelsestype.VURDERT: {
      const vurdering =
        typeof data.vurdering === 'string' ? data.vurdering : null;
      const forrige =
        typeof data.forrigeVurdering === 'string'
          ? data.forrigeVurdering
          : null;
      const tekst = (v: string | null) =>
        v ? v.toLowerCase().replaceAll('_', ' ') : 'ingen vurdering';
      if (!vurdering && !forrige) return null;
      return `${tekst(forrige)} → ${tekst(vurdering)}`;
    }
    case JobbsøkerHendelsestype.REGISTRERT_OPPMØTE:
      return typeof data.deltakernummer === 'number'
        ? `Deltakernummer ${data.deltakernummer}`
        : null;
    case JobbsøkerHendelsestype.REGISTRERT_OPPMØTE_FJERNET: {
      const antall = (felt: unknown) => (typeof felt === 'number' ? felt : 0);
      const slettet =
        antall(data.interesser) +
        antall(data.intervjuplasser) +
        antall(data.vurderinger);
      return slettet > 0
        ? `${slettet} registrering${slettet === 1 ? '' : 'er'} ble slettet`
        : null;
    }
    default:
      return null;
  }
};
export const JobbsøkerHendelseLabel: FC<
  BaseProps<JobbsøkerHendelsestype | string> & { hendelseData?: unknown }
> = ({ icon, hendelseType, antall, size = 'medium', hendelseData }) => {
  const lbl = jobbsøkerLabelTekst(hendelseType);
  const text = antall === undefined ? lbl : `${antall} ${lbl}`;
  const detalj =
    antall === undefined
      ? jobbsøkerDetaljtekst(hendelseType, hendelseData)
      : null;
  return (
    <div>
      <div className='flex items-center space-x-2'>
        <span className='shrink-0'>{icon}</span>
        <BodyShort size={size} className='whitespace-pre-wrap'>
          {text}
        </BodyShort>
      </div>
      {detalj && (
        <BodyShort size='small' className='text-ax-text-neutral-subtle ml-6'>
          {detalj}
        </BodyShort>
      )}
    </div>
  );
};

// 2) Arbeidsgiver
export const arbeidsgiverLabelTekst = (t: ArbeidsgiverHendelsestype) => {
  switch (t) {
    case ArbeidsgiverHendelsestype.OPPRETTET:
      return 'Lagt til';
    case ArbeidsgiverHendelsestype.OPPDATERT:
      return 'Oppdatert';
    case ArbeidsgiverHendelsestype.SLETTET:
      return 'Slettet';
    case ArbeidsgiverHendelsestype.BEHOV_ENDRET:
      return 'Behov endret';
    default:
      return '';
  }
};
export const ArbeidsgiverHendelseLabel: FC<
  BaseProps<ArbeidsgiverHendelsestype>
> = ({ icon, hendelseType, antall, size = 'medium' }) => {
  const lbl = arbeidsgiverLabelTekst(hendelseType);
  const text = antall === undefined ? lbl : `${antall} ${lbl}`;
  return (
    <div className='flex items-center space-x-2'>
      <span className='shrink-0'>{icon}</span>
      <BodyShort size={size} className={'whitespace-pre-wrap'}>
        {text}
      </BodyShort>
    </div>
  );
};

// 3) Rekrutteringstreff

export const rekrutteringstreffLabelTekst = (
  t: RekrutteringstreffHendelsestype,
) => {
  switch (t) {
    case RekrutteringstreffHendelsestype.OPPRETTET:
      return 'Opprettet';
    case RekrutteringstreffHendelsestype.OPPDATERT:
      return 'Oppdatert';
    case RekrutteringstreffHendelsestype.SLETTET:
      return 'Slettet';
    case RekrutteringstreffHendelsestype.PUBLISERT:
      return 'Publisert';
    case RekrutteringstreffHendelsestype.FULLFØRT:
      return 'Fullført';
    case RekrutteringstreffHendelsestype.AVLYST:
      return 'Avlyst';
    case RekrutteringstreffHendelsestype.GJENÅPNET: //Kun fullførte treff kan gjenåpnes
      return 'Gjenåpnet';
    case RekrutteringstreffHendelsestype.TREFF_ENDRET_ETTER_PUBLISERING: //Kun fullførte treff kan gjenåpnes
      return 'Treff endret etter publisering';
    case RekrutteringstreffHendelsestype.TREFF_ENDRET_ETTER_PUBLISERING_NOTIFIKASJON:
      return 'Treff endret etter publisering notifikasjon';

    // TODO: Brukes ikke for øyeblikket, men trengs når vi skal stanse for at flere deltakere blir lagt på og treffet er synlig for veiledere
    case RekrutteringstreffHendelsestype.AVPUBLISERT:
      return 'Avpublisert';
    case RekrutteringstreffHendelsestype.EIER_LAGT_TIL:
      return 'Ny medeier';
    case RekrutteringstreffHendelsestype.EIER_FJERNET:
      return 'Medeier fjernet';
    case RekrutteringstreffHendelsestype.KONTOR_LAGT_TIL:
      return 'Tilknyttet nytt Nav-kontor';
    case RekrutteringstreffHendelsestype.TREFFGJENNOMFØRING_OPPRETTET:
      return 'Gjennomføring startet';
    case RekrutteringstreffHendelsestype.TREFFGJENNOMFØRING_OPPSETT_ENDRET:
      return 'Møteoppsett endret';
    case RekrutteringstreffHendelsestype.TREFFGJENNOMFØRING_INTERVJUFORDELING_FORDELT:
      return 'Intervjuer fordelt på nytt';

    default:
      return '';
  }
};
export const RekrutteringstreffHendelseLabel: FC<
  BaseProps<RekrutteringstreffHendelsestype>
> = ({ icon, hendelseType, antall, size = 'medium' }) => {
  const lbl = rekrutteringstreffLabelTekst(hendelseType);
  const text = antall === undefined ? lbl : `${antall} ${lbl}`;
  return (
    <div className='flex items-start space-x-2'>
      <span className='shrink-0'>{icon}</span>
      <BodyShort size={size} className='whitespace-pre-wrap'>
        {text}
      </BodyShort>
    </div>
  );
};
