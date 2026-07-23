import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { type fetchOptions } from '@/app/api/fetcher';
import { useSWRGet } from '@/app/api/useSWRGet';
import { Roller } from '@/components/tilgangskontroll/roller';
import { getMock } from '@/mocks/mockUtils';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { HttpResponse, type HttpResponseResolver } from 'msw';
import { z } from 'zod';

export const FormidlingSchema = z.object({
  id: z.string(),
  opprettetTidspunkt: z.string(),
  fødselsnummer: z.string().nullable(),
  fornavn: z.string().nullable(),
  etternavn: z.string().nullable(),
  orgnr: z.string(),
  orgnavn: z.string().nullable(),
  stillingId: z.string(),
  yrkestittel: z.string().nullable(),
  sperret: z.boolean(),
});

export const FormidlingListeSchema = z.array(FormidlingSchema);

export type Formidling = z.output<typeof FormidlingSchema>;

export type FormidlingSortering = 'tidspunkt' | 'arbeidsgiver' | 'jobbsoker';
export type FormidlingSorteringsretning = 'asc' | 'desc';

export const standardRetningForFelt = (
  felt: FormidlingSortering,
): FormidlingSorteringsretning => (felt === 'tidspunkt' ? 'desc' : 'asc');

export interface FormidlingerParams {
  sortering?: FormidlingSortering;
  retning?: FormidlingSorteringsretning;
  arbeidsgivere?: string[];
}

export const formidlingListeEndepunkt = (
  variant: 'alle' | 'egne',
  id: string,
  params?: FormidlingerParams,
) => {
  const base = `${RekrutteringstreffAPI.internUrl}/${id}/formidling/liste/${variant}`;
  const søk = new URLSearchParams();
  if (params?.sortering && params.sortering !== 'tidspunkt') {
    søk.set('sortering', params.sortering);
  }
  if (
    params?.retning &&
    params.sortering &&
    params.retning !== standardRetningForFelt(params.sortering)
  ) {
    søk.set('retning', params.retning);
  }
  params?.arbeidsgivere?.forEach((orgnr) => {
    if (orgnr) søk.append('arbeidsgiver', orgnr);
  });
  const spørrestreng = søk.toString();
  return spørrestreng ? `${base}?${spørrestreng}` : base;
};

const useFormidlingerSWR = (
  variant: 'alle' | 'egne',
  id: string | undefined,
  enabled: boolean,
  params?: FormidlingerParams,
  fetchOptionsArg?: fetchOptions,
) => {
  const endpoint =
    id && enabled ? formidlingListeEndepunkt(variant, id, params) : null;
  return useSWRGet(endpoint, FormidlingListeSchema, {
    fetchOptions: fetchOptionsArg,
  });
};

export const useFormidlinger = (
  id: string | undefined,
  params?: FormidlingerParams,
  fetchOptionsArg?: fetchOptions,
) => {
  const { harRolle } = useApplikasjonContext();

  const brukerAlleEndpoint = harRolle([
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
  ]);
  const brukerEgneEndpoint =
    !brukerAlleEndpoint &&
    harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET]);

  const alle = useFormidlingerSWR(
    'alle',
    id,
    brukerAlleEndpoint,
    params,
    fetchOptionsArg,
  );
  const egne = useFormidlingerSWR(
    'egne',
    id,
    brukerEgneEndpoint,
    params,
    fetchOptionsArg,
  );

  return brukerAlleEndpoint ? alle : egne;
};

export const useFormidlingerForWorkOp = (id: string | undefined) =>
  useFormidlingerSWR('alle', id, Boolean(id), undefined, {
    skjulFeilmelding: true,
  });

export const FORMIDLING_LISTE_FORBUDT_TREFF_ID = 'formidling-liste-forbudt';
export const FORMIDLING_LISTE_TOM_TREFF_ID = 'formidling-liste-tom';
export const FORMIDLING_LISTE_SPERRET_TREFF_ID = 'formidling-liste-sperret';

const mockFormidlinger: Formidling[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    opprettetTidspunkt: '2025-03-12T09:15:00',
    fødselsnummer: '41017512345',
    fornavn: 'Testperson',
    etternavn: 'Én',
    orgnr: '999999991',
    orgnavn: 'Testbedrift AS',
    stillingId: 'publisertStilling',
    yrkestittel: 'Butikkmedarbeider',
    sperret: false,
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    opprettetTidspunkt: '2025-03-12T10:05:00',
    fødselsnummer: '42026598765',
    fornavn: 'Testperson',
    etternavn: 'To',
    orgnr: '999999991',
    orgnavn: 'Testbedrift AS',
    stillingId: 'baseStilling',
    yrkestittel: 'Lagermedarbeider',
    sperret: false,
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    opprettetTidspunkt: '2025-03-13T11:30:00',
    fødselsnummer: null,
    fornavn: 'Testperson',
    etternavn: 'Tre',
    orgnr: '999999992',
    orgnavn: 'Eksempelfirma Norge AS',
    stillingId: 'etterregistrering',
    yrkestittel: 'Kokk',
    sperret: false,
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    opprettetTidspunkt: '2025-03-14T08:45:00',
    fødselsnummer: '44048722334',
    fornavn: 'Testperson',
    etternavn: 'Fire',
    orgnr: '999999992',
    orgnavn: 'Eksempelfirma Norge AS',
    stillingId: 'jobbmesse',
    yrkestittel: 'Servitør',
    sperret: false,
  },
];

const mockWorkOpFormidlinger: Formidling[] = [
  {
    id: 'workop-formidling-test-1',
    opprettetTidspunkt: '2026-07-23T09:15:00',
    fødselsnummer: '12345670000',
    fornavn: 'Marius',
    etternavn: 'Etternavn01',
    orgnr: 'TEST-ORG-WORKOP-1',
    orgnavn: 'Arbeidsgiver 1',
    stillingId: 'workop-formidling-stilling-1',
    yrkestittel: 'Testyrke',
    sperret: false,
  },
  {
    id: 'workop-formidling-test-2',
    opprettetTidspunkt: '2026-07-23T09:16:00',
    fødselsnummer: '12345670001',
    fornavn: 'Emilie',
    etternavn: 'Etternavn02',
    orgnr: 'TEST-ORG-WORKOP-1',
    orgnavn: 'Arbeidsgiver 1',
    stillingId: 'workop-formidling-stilling-1',
    yrkestittel: 'Testyrke',
    sperret: false,
  },
  {
    id: 'workop-formidling-test-3',
    opprettetTidspunkt: '2026-07-23T09:17:00',
    fødselsnummer: 'TEST-FNR-FORMIDLING-UTEN-OPPMØTE',
    fornavn: 'Testfornavn',
    etternavn: 'Testetternavn formidling',
    orgnr: 'TEST-ORG-WORKOP-2',
    orgnavn: 'Arbeidsgiver 2',
    stillingId: 'workop-formidling-stilling-2',
    yrkestittel: 'Testyrke',
    sperret: false,
  },
];

const mockEgneFormidlinger: Formidling[] = mockFormidlinger.slice(0, 2);

const mockSperretFormidlinger: Formidling[] = [
  {
    id: '55555555-5555-5555-5555-555555555555',
    opprettetTidspunkt: '2025-03-15T09:00:00',
    fødselsnummer: null,
    fornavn: null,
    etternavn: null,
    orgnr: '999999991',
    orgnavn: 'Testbedrift AS',
    stillingId: 'publisertStilling',
    yrkestittel: 'Butikkmedarbeider',
    sperret: true,
  },
];

const sorterFormidlinger = (
  formidlinger: Formidling[],
  sortering: string | null,
  retning: string | null,
): Formidling[] => {
  const kopi = [...formidlinger];
  const felt: FormidlingSortering =
    sortering === 'arbeidsgiver'
      ? 'arbeidsgiver'
      : sortering === 'jobbsoker' || sortering === 'jobbsøker'
        ? 'jobbsoker'
        : 'tidspunkt';
  const aktivRetning: FormidlingSorteringsretning =
    retning === 'asc' || retning === 'desc'
      ? retning
      : standardRetningForFelt(felt);
  const faktor = aktivRetning === 'asc' ? 1 : -1;

  if (felt === 'arbeidsgiver') {
    return kopi.sort(
      (a, b) =>
        faktor * (a.orgnavn ?? '').localeCompare(b.orgnavn ?? '', 'nb') ||
        b.opprettetTidspunkt.localeCompare(a.opprettetTidspunkt),
    );
  }
  if (felt === 'jobbsoker') {
    return kopi.sort(
      (a, b) =>
        faktor * (a.etternavn ?? '').localeCompare(b.etternavn ?? '', 'nb') ||
        faktor * (a.fornavn ?? '').localeCompare(b.fornavn ?? '', 'nb') ||
        b.opprettetTidspunkt.localeCompare(a.opprettetTidspunkt),
    );
  }
  // tidspunkt
  return kopi.sort(
    (a, b) => faktor * a.opprettetTidspunkt.localeCompare(b.opprettetTidspunkt),
  );
};

const lagFormidlingListeMockHandler =
  (kunEgne: boolean): HttpResponseResolver =>
  ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;

    if (!kunEgne && treffId === FORMIDLING_LISTE_FORBUDT_TREFF_ID) {
      return HttpResponse.json(
        { feil: 'Personen har ikke tilgang til formidlingslisten' },
        { status: 403 },
      );
    }

    if (treffId === FORMIDLING_LISTE_TOM_TREFF_ID) {
      return HttpResponse.json([]);
    }

    if (treffId === FORMIDLING_LISTE_SPERRET_TREFF_ID) {
      return HttpResponse.json(mockSperretFormidlinger);
    }

    const url = new URL(request.url);
    const sortering = url.searchParams.get('sortering');
    const retning = url.searchParams.get('retning');
    const valgteArbeidsgivere = url.searchParams.getAll('arbeidsgiver');

    let resultat =
      treffId === 'workop'
        ? kunEgne
          ? mockWorkOpFormidlinger.slice(0, 1)
          : mockWorkOpFormidlinger
        : kunEgne
          ? mockEgneFormidlinger
          : mockFormidlinger;
    if (valgteArbeidsgivere.length > 0) {
      resultat = resultat.filter((f) => valgteArbeidsgivere.includes(f.orgnr));
    }
    resultat = sorterFormidlinger(resultat, sortering, retning);

    return HttpResponse.json(resultat);
  };

export const formidlingListeAlleMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/formidling/liste/alle`,
  lagFormidlingListeMockHandler(false),
);

export const formidlingListeEgneMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/formidling/liste/egne`,
  lagFormidlingListeMockHandler(true),
);
