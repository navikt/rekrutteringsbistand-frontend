import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { type fetchOptions } from '@/app/api/fetcher';
import { useSWRGet } from '@/app/api/useSWRGet';
import { Roller } from '@/components/tilgangskontroll/roller';
import { getMock } from '@/mocks/mockUtils';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { HttpResponse } from 'msw';
import { z } from 'zod';

export const FormidlingSchema = z.object({
  id: z.string(),
  opprettetTidspunkt: z.string(),
  fødselsnummer: z.string(),
  fornavn: z.string().nullable(),
  etternavn: z.string().nullable(),
  orgnr: z.string(),
  orgnavn: z.string().nullable(),
  stillingId: z.string(),
});

export const FormidlingListeSchema = z.array(FormidlingSchema);

export type Formidling = z.output<typeof FormidlingSchema>;

export const formidlingListeEndepunkt = (
  variant: 'alle' | 'egne',
  id: string,
) => `${RekrutteringstreffAPI.internUrl}/${id}/formidling/liste/${variant}`;

const useFormidlingerSWR = (
  variant: 'alle' | 'egne',
  id: string | undefined,
  enabled: boolean,
  fetchOptionsArg?: fetchOptions,
) => {
  const endpoint = id && enabled ? formidlingListeEndepunkt(variant, id) : null;
  return useSWRGet(endpoint, FormidlingListeSchema, {
    fetchOptions: fetchOptionsArg,
  });
};

export const useFormidlinger = (
  id: string | undefined,
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
    fetchOptionsArg,
  );
  const egne = useFormidlingerSWR(
    'egne',
    id,
    brukerEgneEndpoint,
    fetchOptionsArg,
  );

  return brukerAlleEndpoint ? alle : egne;
};

export const FORMIDLING_LISTE_FORBUDT_TREFF_ID = 'formidling-liste-forbudt';
export const FORMIDLING_LISTE_TOM_TREFF_ID = 'formidling-liste-tom';

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
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    opprettetTidspunkt: '2025-03-13T11:30:00',
    fødselsnummer: '43037611223',
    fornavn: 'Testperson',
    etternavn: 'Tre',
    orgnr: '999999992',
    orgnavn: 'Eksempelfirma Norge AS',
    stillingId: 'etterregistrering',
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
  },
];

const mockEgneFormidlinger: Formidling[] = mockFormidlinger.slice(0, 2);

const lagFormidlingListeMockHandler =
  (kunEgne: boolean) =>
  ({ params }: Parameters<Parameters<typeof getMock>[1]>[0]) => {
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

    return HttpResponse.json(kunEgne ? mockEgneFormidlinger : mockFormidlinger);
  };

export const formidlingListeAlleMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/formidling/liste/alle`,
  lagFormidlingListeMockHandler(false),
);

export const formidlingListeEgneMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/formidling/liste/egne`,
  lagFormidlingListeMockHandler(true),
);
