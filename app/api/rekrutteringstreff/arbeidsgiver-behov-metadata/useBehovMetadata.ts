import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';
import { z } from 'zod';

const BehovMetadataSchema = z.object({
  ansettelsesformer: z.array(z.string()),
  arbeidssprak: z.array(z.string()),
});

export type BehovMetadataDTO = z.infer<typeof BehovMetadataSchema>;

const endepunkt = `${RekrutteringstreffAPI.internUrl}/arbeidsgiver-behov-metadata`;

export const useBehovMetadata = () => useSWRGet(endepunkt, BehovMetadataSchema);

export const behovMetadataMSWHandler = getMock(endepunkt, () =>
  HttpResponse.json({
    ansettelsesformer: [
      'Fast',
      'Vikariat',
      'Engasjement',
      'Prosjekt',
      'Sesong',
      'Trainee',
      'Lærling',
      'Annet',
      'Selvstendig næringsdrivende',
      'Feriejobb',
      'Åremål',
    ],
    arbeidssprak: [
      'Norsk',
      'Engelsk',
      'Svensk',
      'Dansk',
      'Tysk',
      'Fransk',
      'Spansk',
      'Annet',
    ],
  }),
);
